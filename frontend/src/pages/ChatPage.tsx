import styled from 'styled-components';
import { IconUserName } from '../assets/icons';
import ChatBubble from '../components/chatting/ChatBubble';
import { useAppSelector } from '../redux/configStore.hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { aY } from '@fullcalendar/core/internal-common';
import {ChattingBlockStateType} from '../../types/chat/chattingBlockStateType';
import {ChatSendType} from '../../types/chat/chatSendType';

function ChatPage() {
    //const user = useAppSelector((state) => state.user.userData);
    const user = "js7744"
    const [chatBubbles, setChatBubbles] = useState<JSX.Element[]>([]);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [questionContext, setQuestionContext] = useState('');
    const onChangeContext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionContext(e.target.value);
    };

    useEffect(() => {
        const callPastChatting = async () => {
            const response = await getPastChatting(user);
            const chattingRecord = response as ChattingBlockStateType[];
            const newChatBubbles = chattingRecord.map((record, index) => {
                return [
                    <ChatBubble message={record.question} isAI={false} time={getFormattedTime(record.chatTime)} name={record.userId.userId}></ChatBubble>,
                    <ChatBubble message={record.answer} isAI={true} time={getFormattedTime(record.chatTime)} name={'티티'}></ChatBubble>
                ];
            }).flat();
            setChatBubbles([...newChatBubbles, ...chatBubbles]);
        };
        callPastChatting();
    }, []);

    const handleSaveBtnClick = async() =>{
        if(questionContext.length === 0) return;
        setButtonDisabled(true);
        const chatTime = new Date();
        setQuestionContext('');
        setChatBubbles(prevChatBubbles =>[...prevChatBubbles, <ChatBubble message={questionContext} isAI={false} time={getFormattedTime(chatTime.toString())} name={user}></ChatBubble>]);
        const res = await sendQuestionToServer(questionContext, user, chatTime);
        const answer = res as ChattingBlockStateType;
        setChatBubbles(prevChatBubbles =>[...prevChatBubbles, <ChatBubble message={answer.answer} isAI={true} time={getFormattedTime(new Date().toString())} name={'티티'}></ChatBubble>]);
        setButtonDisabled(false);
    }

    return (
        <ChatPageWrapper>
            <ComponentWrapper>
                <ChatBubbleListArea>
                    {[...chatBubbles].reverse().map((bubble, index) => bubble)}
                </ChatBubbleListArea>
                <ChattingInputBtnArea>
                    <WriteDiary>
                        <DiaryContext rows={25} placeholder="Type your diary here..."  value={questionContext} onChange={onChangeContext}></DiaryContext>
                    </WriteDiary>
                    <Button onClick={() =>handleSaveBtnClick()}  disabled={isButtonDisabled}>
                        <IconUserName />
                        <Text>✏️ SEND</Text>
                    </Button>
                </ChattingInputBtnArea>
            </ComponentWrapper>
        </ChatPageWrapper>
    );
};

export default ChatPage;

const getPastChatting = async(userId: string) => {
    try {
    const response = await axios.get(`http://127.0.0.1:8080/chatting/list?userId=${userId}`);
    return response.data;
    } catch (error) {
    console.error(error);
    }
}
const sendQuestionToServer = async(message: string, userId:string, chatTime:Date) => {
    const sendObj: ChatSendType = { userId, message };
    try {
        const response = await axios.post(`http://127.0.0.1:8080/chatting`, sendObj);
        return response.data;
        } catch (error) {
        console.error(error);
        }
}

const getFormattedTime = (chatDate: string) => {
    const chatTime = new Date(chatDate);
    const year = chatTime.getFullYear();
    const month = String(chatTime.getMonth() + 1).padStart(2, '0');
    const date = String(chatTime.getDate()).padStart(2, '0');
    const hours = String(chatTime.getHours()).padStart(2, '0');
    const minutes = String(chatTime.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${date} ${hours}:${minutes}`;
}

const ChatBubbleListArea = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column-reverse;
    align-items: flex-end;
    overflow: auto;

    width: 94%;
    height: 450px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 10px 10px 10px 10px;
`;

const ChatPageWrapper = styled.p`
    background-color: ${(props) => props.theme.color.white};

    display: flex;
    justify-content: center;

    width: 100%;
    height: 700px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 10px 10px 10px 10px;
`;

const ChattingInputBtnArea = styled.div`
    background-color: ${(props) => props.theme.color.yellow01};
    border-radius: 30px;
    flex-direction: row;
    align-items: center;

    display: flex;
    justify-content: space-between;

    width: 94%;
    height: 100px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 30px 10px 30px 10px;
`;

const WriteDiary  = styled.p`
    padding: 10px; 

    background-color: ${({ theme }) => theme.color.yellow01};
    border-radius: 30px;

    width: 95%;
    height: 80%;
`;

const DiaryContext = styled.textarea`
    color: ${({ theme }) => theme.color.black};

    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-family: OmyuPretty;
    
    background-color: transparent; 
    padding: 16px;
    border: none;
    outline: none;

    width: 95%;
    height: 80%;
`;

const ComponentWrapper = styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    border-radius: 30px;
    width: 80%;

    font-weight: 600;
    font-size: 0.8rem;
    overflow: hidden;

    padding: 1rem 0.5rem 0.5rem 0.5rem;
    margin: 10px 10px 0px 10px;

    background-color: ${({ theme }) => theme.color.yellow02};
`;

const SendButtonWrapper = styled.div`
    margin-top: auto; 
    display: flex;
    align-items: flex-end;
    gap: 10px; 
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; 

    width: 10rem;
    height: 4rem;

    background: none;
    border: none;
`;

const Text = styled.span`
    font-size: 1.7rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    color: ${(props) => props.theme.color.black};
    font-family: OmyuPretty;

    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

