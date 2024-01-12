import styled from 'styled-components';
import DiaryResult from '../components/emotionResult/DiaryResult';
import ProgressBar from '../components/emotionResult/ProgressBar';
import {AnalysisInfoType} from '../../types/diary/analysisInfoType';
import { ChickenImage } from '../assets/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/configStore.hooks';

function EmotionResult() {
    const {diaryId} = useParams<{diaryId : string}>();
    const user = useAppSelector((state) => state.user.userData);
    const [emotionList, setEmotionList] = useState<{ key: string; value: any; }[]>([]);
    const [diaryData, setDiaryData] = useState<AnalysisInfoType>();
    useEffect(() => {
        const initPage = async () => {
            const data = await getResultData(user.id, Number(diaryId));
            console.log(data);
            const newEmotionList = getEmotionList(data);
            setEmotionList(newEmotionList as { key: string; value: any; }[]);
            setDiaryData(data);
        }
        initPage();
    }, [user, diaryId])
    return (
            <EmotionResultContainer>
                <UpperHorizontalContainer>
                    <ProgressBarContainer>
                    {emotionList.length > 0 && (
                        <>
                            <ProgressBar availableItem={emotionList[0].value} barName={emotionList[0].key}></ProgressBar>
                            <ProgressBar availableItem={emotionList[1].value} barName={emotionList[1].key}></ProgressBar>
                            <ProgressBar availableItem={emotionList[2].value} barName={emotionList[2].key}></ProgressBar>
                            <ProgressBar availableItem={emotionList[3].value} barName={emotionList[3].key}></ProgressBar>
                        </>
                    )}
                    </ProgressBarContainer>
                    <DiaryResult text={diaryData?.content}></DiaryResult>
                </UpperHorizontalContainer>
                <RowWrapper>
                    <ChickenImageResized></ChickenImageResized>
                    <ChickenWordWrapper>
                        <ChickenWord></ChickenWord>
                        <ChickenWordContext>
                            {diaryData?.resultComment}
                        </ChickenWordContext>
                    </ChickenWordWrapper>
                </RowWrapper>
            </EmotionResultContainer>
    );
}

export default EmotionResult;

const getEmotionList = (data : object) =>{
    const emotionList = [];
    for (const [ENkey, value] of Object.entries(data)) {
        let key = '';
        switch(ENkey){
            case 'fear': key = '두려움'; break;
            case 'happiness': key = '행복'; break;
            case 'neutrality': key = '중립'; break;
            case 'sadness': key = '슬픔'; break;
            case 'surprised': key = '놀람'; break;
            case 'anger': key = '분노'; break;
            case 'disgust': key = '혐오'; break;
            default:
                continue;
        }
        emotionList.push({key, value});
    }
    //emotionList에서 value가 가장 큰 4개를 뽑고 같으면 사전순으로 4개를 채운다.
    emotionList.sort((a, b) => b.value - a.value);
    if(emotionList.length > 4){
        emotionList.splice(4, emotionList.length - 4);
    }
    else if(emotionList.length < 4){
        const temp = ['fear', 'happiness', 'neutrality', 'sadness', 'surprised', 'anger', 'disgust'];
        for(let i = 0; i < emotionList.length; i++){
            temp.splice(temp.indexOf(emotionList[i].key), 1);
        }
        for(let i = 0; i < 4 - emotionList.length; i++){
            emotionList.push({key: temp[i], value: 0});
        }
    }
    return emotionList;
}

const getResultData = async (userId:string, diaryId:number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/diary/analysis?userId=${userId}&diaryId=${diaryId}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 30px;
    
    background-color: transparent;

    padding: .5px .5px .5px .5px;
    margin: .5px .5px .5px .5px;

    width: 100%;
    height: 30%;

    gap: 10px;
`;

const ChickenWordContext = styled.p`
    position: absolute; 

    bottom: 1px;
    left: 0;

    width: 100%;
    height: 30px;

    justify-content: center; 
    align-items: center;

    color: ${({ theme }) => theme.color.black};

    text-align: center;

    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-family: OmyuPretty;
`;


const ChickenImageResized = styled(ChickenImage)`
  width: 400px; /* 원하는 너비 설정 */
  height: 150px; /* 원하는 높이 설정 */
`;

const ChickenWordWrapper = styled.div`
    position: relative;

    padding: .5px .5px .5px .5px;
    margin: .5px .5px .5px .5px;

    width: 80%;
    height: 70px;
`;

const ChickenWord = styled.div`
    background-color: ${(props) => props.theme.color.gray};
    border-radius: 30px;
    flex-direction: column;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 80px;
    
    padding: .5px .5px .5px .5px;
    margin: .5px .5px .5px .5px;
`;

const ProgressBarContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 10%;

    font-weight: 600;
    font-size: 0.8rem;

    padding: 1rem 0.5rem 5rem 0.5rem;
    margin: 10px 10px 0px 10px;

    background-color: ${({ theme }) => theme.color.yellow01};
    border-radius: 12px;
`;

const EmotionResultContainer = styled.div`
    background-color: ${(props) => props.theme.color.yellow01};
    border-radius: 30px;
    flex-direction: column;

    display: flex;
    justify-content: space-between;

    width: 94%;
    height: 700px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 30px 10px 30px 10px;
`;

const UpperHorizontalContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%; 
    height: 80%;

    flex-direction: row;
`;