import styled from 'styled-components';
import InnerDiaryResult from './InnerDiaryResult';

function DiaryResult(props: any)  {
    const today = getCurrentDay();

    return (
        <DiaryResultContainer>
            <DiaryDayWrapper>
                <DiaryDay>
                    {today}
                </DiaryDay>
            </DiaryDayWrapper>
            <InnerDiaryResult>
            </InnerDiaryResult>
        </DiaryResultContainer>
    )
};

export default DiaryResult;

const DiaryResultContainer = styled.div`
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 30px;

    position: relative;
    width: 30%;
    
    padding: 10rem 10rem 10rem; 
    margin: 20px 10px 20px 10px;
`;

const DiaryDayWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%
`;

const DiaryDay = styled.p`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.color.black};

    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-family: OmyuPretty;
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