import styled from 'styled-components';
import DiaryResult from '../components/emotionResult/DiaryResult';

function EmotionResult() {
    return (
            <EmotionResultContainer>
                <DiaryResult>
                </DiaryResult>
            </EmotionResultContainer>
    );
}

export default EmotionResult;

const EmotionResultContainer = styled.div`
    background-color: ${(props) => props.theme.color.yellow01};
    border-radius: 30px;

    position: relative;
    
    padding: 30rem 0 20rem; 
    margin: 30px 30px
`;
