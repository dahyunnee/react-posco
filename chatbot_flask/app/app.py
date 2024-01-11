#-- flask 관련 import
from flask import Flask, render_template, request, jsonify
import json

#-- model 관련 import
import numpy as np

import torch
from torch import nn
from torch.utils.data import Dataset
import gluonnlp as nlp

from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel

#-- 'Flask' 클래스의 인스턴스 생성
app = Flask(__name__)

#-- json 파일은 클래스 인덱스와 그에 해당하는 라벨을 매핑하는데 사용됨
with open('../class_index.json', 'r') as f:
    class_idx = json.load(f)

#-- '/'
@app.route('/')
def main():
    return render_template('main.html')

#-- '/diary'
@app.route('/diary')
def diary():
    return render_template('diary.html')

#-- '/chatbot'
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

#======================================= 일기 관련 =======================================#
#-- tokenizer, bertmodel, vocab
def get_kobert_model(model_path, vocab_file, ctx="cpu"):
    bertmodel = BertModel.from_pretrained(model_path)
    device = torch.device(ctx)
    bertmodel.to(device)
    bertmodel.eval()
    vocab_b_obj = nlp.vocab.BERTVocab.from_sentencepiece(vocab_file,
                                                         padding_token='[PAD]')
    return bertmodel, vocab_b_obj
 
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
tok=tokenizer.tokenize
bertmodel, vocab = get_kobert_model('skt/kobert-base-v1', tokenizer.vocab_file)

#-- Setting parameters
max_len = 64
batch_size = 64

#-- BERT 모델의 입력으로 넣기 위한 데이터셋 토큰화
# nlp 모듈의 BERTSentenceTransform을 적용하여 입력 문장과 레이블을 토큰화하고 변환하는 작업을 수행
class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer,vocab, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len,vocab=vocab, pad=pad, pair=pair)
        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]
    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))
    def __len__(self):
        return (len(self.labels))

#-- KoBERT
class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=7,   ##클래스 수 조정##
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device),return_dict=False)
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)

#-- device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)

#-- '/diaryEmotion'
@app.route('/diaryEmotion', methods=['POST'])
def diaryEmotion():
    print('-' * 100)

    #-- emotion_model load & 평가 모드 설정
    emotion_model = torch.load("../emotion_model.pt", map_location=device)
    emotion_model.eval()
    print("emotion_model OK")

    # POST 요청에서 데이터 추출
    predict_sentence = request.form['input_text']
    print(predict_sentence)

    # 데이터셋 구성
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, vocab, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

    emotion_model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = emotion_model(token_ids, valid_length, segment_ids)

        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()

            if np.argmax(logits) == 0:
                result = "공포"
            elif np.argmax(logits) == 1:
                result = "놀람"
            elif np.argmax(logits) == 2:
                result = "분노"
            elif np.argmax(logits) == 3:
                result = "슬픔"
            elif np.argmax(logits) == 4:
                result = "중립"
            elif np.argmax(logits) == 5:
                result = "행복"
            elif np.argmax(logits) == 6:
                result = "혐오"

        print(">> 일기에서 느껴지는 감정 : " + result)
        print('-' * 100)
        return jsonify({'class': str(np.argmax(logits)), 'result': result})
#========================================================================================#


#--------------------------------------- 챗봇 관련 ---------------------------------------#
import logging
from kobert_transformers import get_kobert_model
from transformers import BertConfig
from torch.nn import CrossEntropyLoss, MSELoss
from transformers import BertTokenizer
import random

logger = logging.getLogger(__name__)
kobert_config = {
    'attention_probs_dropout_prob': 0.1,
    'hidden_act': 'gelu',
    'hidden_dropout_prob': 0.1,
    'hidden_size': 768,
    'initializer_range': 0.02,
    'intermediate_size': 3072,
    'max_position_embeddings': 512,
    'num_attention_heads': 12,
    'num_hidden_layers': 12,
    'type_vocab_size': 2,
    'vocab_size': 8002
}

def get_kobert_config():
    return BertConfig.from_dict(kobert_config)

#-- KoBERTforSequenceClassfication
class KoBERTforSequenceClassfication(BertModel):
    def __init__(self,
                 num_labels=359,
                 hidden_size=768,
                 hidden_dropout_prob=0.1,
                 ):
        super().__init__(get_kobert_config())

        self.num_labels = num_labels
        self.kobert = get_kobert_model()
        self.dropout = nn.Dropout(hidden_dropout_prob)
        self.classifier = nn.Linear(hidden_size, num_labels)

        self.init_weights()

    def forward(
            self,
            input_ids=None,
            attention_mask=None,
            token_type_ids=None,
            position_ids=None,
            head_mask=None,
            inputs_embeds=None,
            labels=None,
    ):
        outputs = self.kobert(
            input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            position_ids=position_ids,
            head_mask=head_mask,
            inputs_embeds=inputs_embeds,
        )

        pooled_output = outputs[1]

        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)

        outputs = (logits,) + outputs[2:]  # add hidden states and attention if they are here

        if labels is not None:
            if self.num_labels == 1:
                #  We are doing regression
                loss_fct = MSELoss()
                loss = loss_fct(logits.view(-1), labels.view(-1))
            else:
                loss_fct = CrossEntropyLoss()
                loss = loss_fct(logits.view(-1, self.num_labels), labels.view(-1))
            outputs = (loss,) + outputs

        return outputs  # (loss), logits, (hidden_states), (attentions)

#-- load_wellness_answer
def load_wellness_answer():
    category_path = "../wellness_dialog_category.txt"
    answer_path = "../wellness_dialog_answer.txt"

    c_f = open(category_path, 'r')
    a_f = open(answer_path, 'r')

    category_lines = c_f.readlines()
    answer_lines = a_f.readlines()

    category = {}
    answer = {}
    for line_num, line_data in enumerate(category_lines):
        data = line_data.split('    ')
        category[data[1][:-1]] = data[0]

    for line_num, line_data in enumerate(answer_lines):
        data = line_data.split('    ')
        keys = answer.keys()
        if (data[0] in keys):
            answer[data[0]] += [data[1][:-1]]
        else:
            answer[data[0]] = [data[1][:-1]]

    return category, answer

#-- kobert_input
def kobert_input(tokenizer, str, device=None, max_seq_len=512):
    index_of_words = tokenizer.encode(str)
    token_type_ids = [0] * len(index_of_words)
    attention_mask = [1] * len(index_of_words)

    # Padding Length
    padding_length = max_seq_len - len(index_of_words)

    # Zero Padding
    index_of_words += [0] * padding_length
    token_type_ids += [0] * padding_length
    attention_mask += [0] * padding_length

    data = {
        'input_ids': torch.tensor([index_of_words]).to(device),
        'token_type_ids': torch.tensor([token_type_ids]).to(device),
        'attention_mask': torch.tensor([attention_mask]).to(device),
    }
    return data

#-- '/chating'
@app.route('/chating', methods=['POST'])
def chating():
    print('-' * 100)

    # 클라이언트로부터 채팅 입력 받기
    input_text = request.form['input_text']
    print(input_text)
    
    # 답변과 카테고리 불러오기
    category, answer = load_wellness_answer()

    tokenizer = BertTokenizer.from_pretrained("monologg/kobert")
    data = kobert_input(tokenizer, input_text, device, 512)
    
    chat_model = torch.load("../kobert.pt", map_location=device)
    chat_model.eval()
    print("chat_model OK")

    output = chat_model(**data)
    
    logit = output[0]
    softmax_logit = torch.softmax(logit, dim=-1)
    softmax_logit = softmax_logit.squeeze()

    max_index = torch.argmax(softmax_logit).item()
    max_index_value = softmax_logit[torch.argmax(softmax_logit)].item()

    answer_list = answer[category[str(max_index)]]
    answer_len = len(answer_list) - 1
    answer_index = random.randint(0, answer_len)
    print(f'Answer: {answer_list[answer_index]}, index: {max_index}, softmax_value: {max_index_value}')
    print('-' * 100)

    return jsonify({'response': answer_list[answer_index]})
#----------------------------------------------------------------------------------------#

# 스크립트가 직접 실행되는 경우에만 Flask 애플리케이션을 실행
# flask 외부 접속 허용, 방화벽 설정(인바운드 규칙 5000 추가)
# debug=True로 설정하면 코드 변경이 있을 때마다 서버가 자동으로 재시작
if __name__ == '__main__': 
    app.run(host='127.0.0.1', port = 5000, debug=True)



