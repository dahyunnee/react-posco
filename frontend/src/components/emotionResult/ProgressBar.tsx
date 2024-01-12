import { CSSProperties } from 'styled-components';
import { styled } from 'styled-components';

interface ITest{
    width: number;
} 

interface ProgressBarProps {
    availableItem?:number;
    barName? : string;
    style? : CSSProperties;
}

function ProgressBar({availableItem, barName, style}: ProgressBarProps) {
	const maxItem = 5
    if(availableItem === undefined) availableItem = 0;
    if(barName === undefined) barName = 'empty';
    return (
        <div style={style}>
            <ProgressBarContainer>
                <Progress width = {availableItem*100/maxItem}/>
            </ProgressBarContainer>
            <TextContainer>
                <EmotionText>{barName}</EmotionText>
                <PercentageText>{Math.round((availableItem * 100) / maxItem)}%</PercentageText>
            </TextContainer>
        </div>
    )
}

export default ProgressBar;

const ProgressBarContainer = styled.div`
    width: 90%;
    height: 20px;

    background-color: ${({ theme }) => theme.color.background};
    border-radius: 17px;

    padding: 0.5rem 1.5rem 1rem 0.5rem;
`;

const Progress = styled.div<ITest>`
    width: ${(props: ITest) => props.width}%; 

    height: 28px;
    text-align: center;
    
    background-color: ${({ theme }) => theme.color.progress_pink};
    border-radius: 10px;
    
    padding: 0;
    margin: 1px 1px 1px 1px;
`;


const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    width: 90%;
    margin: 10px 10px 80px 10px;
`;

const EmotionText = styled.span`
    font-size: 1.2rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-family: OmyuPretty;
`;

const PercentageText = styled.span`
    font-size: 1.2rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-family: OmyuPretty;
`;