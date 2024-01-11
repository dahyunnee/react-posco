import styled from 'styled-components';
import DiaryResult from '../components/emotionResult/DiaryResult';
import ProgressBar from '../components/emotionResult/ProgressBar';
import { ChickenImage } from '../assets/icons';

function EmotionResult() {
    return (
            <EmotionResultContainer>
                <UpperHorizontalContainer>
                    <ProgressBarContainer>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                        <ProgressBar></ProgressBar>
                    </ProgressBarContainer>
                    <DiaryResult></DiaryResult>
                </UpperHorizontalContainer>
                <RowWrapper>
                    <ChickenImageResized></ChickenImageResized>
                    <ChickenWordWrapper>
                        <ChickenWord></ChickenWord>
                        <ChickenWordContext>
                            잠을 못 자는 것만큼 힘든 게 없죠. <br/>
                            너무 힘들면 잠깐 산책이라도 하는 건 어떨까요?
                        </ChickenWordContext>
                    </ChickenWordWrapper>
                </RowWrapper>
            </EmotionResultContainer>
    );
}

export default EmotionResult;

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