import { styled } from 'styled-components';
import { SpeechBubble, IconUserName } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

function DiaryPage() {
    const navigate = useNavigate();
    const today = getCurrentDay();

    return (
        <DiaryPageWrapper>
            <ComponentWrapper>
                
            </ComponentWrapper>
            <ComponentWrapper>
                <DiaryDayWrapper>
                    <DiaryDay>
                        🗓️ {today}
                    </DiaryDay>
                </DiaryDayWrapper>
                <WriteDiary>
                    <DiaryContext rows={25} placeholder="Type your diary here..."></DiaryContext>
                </WriteDiary>
                <SendButtonWrapper>
                    <Button onClick={() => navigate('/result/1')}>
                        <IconUserName />
                        <ButtonText>✏️ SEND</ButtonText>
                    </Button>
                </SendButtonWrapper>
            </ComponentWrapper>
        </DiaryPageWrapper>
    );
};

export default DiaryPage;

const DiaryPageWrapper = styled.p`
    background-color: ${(props) => props.theme.color.white};

    display: flex;
    justify-content: space-between;

    width: 94%;
    height: 700px;
    
    padding: 1rem 1.5rem 1rem 1.5rem; 
    margin: 10px 10px 10px 10px;
`;

const ComponentWrapper = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center; 
    border-radius: 30px;
    width: 80%;

    font-weight: 600;
    font-size: 0.8rem;
    overflow: hidden;

    padding: 1rem 0.5rem 5rem 0.5rem;
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

const ButtonText = styled.span`
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

const DiaryDayWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
`;

const DiaryDay = styled.p`
    align-items: center; 
    position: flex;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.color.black};

    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-family: OmyuPretty;
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

const getCurrentDay = () => {
    const currentDate = new Date();

    // 월 이름 매핑
    const monthNames = {
        January: '1월',
        February: '2월',
        March: '3월',
        April: '4월',
        May: '5월',
        June: '6월',
        July: '7월',
        August: '8월',
        September: '9월',
        October: '10월',
        November: '11월',
        December: '12월'
    };

  // 날짜 형식화
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }).format(currentDate);

    const [weekday, month, day, year] = formattedDate.split(/,?\s/);
    const newMonth = monthNames[month as keyof typeof monthNames]; 
    const formattedResult = `${year}년 ${newMonth} ${day}일 ${weekday}`;

    return formattedResult;
}
