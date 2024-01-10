import styled from 'styled-components';
import DiaryResult from '../components/emotionResult/DiaryResult';
import ProgressBar from '../components/emotionResult/ProgressBar';

function EmotionResult() {
    return (
            <>
                <EmotionResultContainer>
                    <ProgressBarContainer>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                    </ProgressBarContainer>
                    <DiaryResult></DiaryResult>
                </EmotionResultContainer>
            </>
    );
}

export default EmotionResult;

const ProgressBarContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;

    font-weight: 600;
    font-size: 0.8rem;
    overflow: hidden;
    //gap: 40px;

    padding: 5rem 0.5rem 5rem 0.5rem;
    margin: 30px 10px 0px 10px;

    background-color: ${({ theme }) => theme.color.yellow01};
    border-radius: 12px;
`;

const EmotionResultContainer = styled.div`
    background-color: ${(props) => props.theme.color.yellow01};
    border-radius: 30px;

    display: flex;
    justify-content: space-between;

    width: 94%;
    height: 800px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 30px 10px 30px 10px;
`;
