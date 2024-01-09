import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IconUserName, BackButton } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentMonth = getCurrentMonth();
    const currentDate = getCurrentDay();
    
    return (
        <HeaderWrapper>
            {location.pathname === '/' ? (
                <>
                    <div/>
                    <HeaderMonth>
                        {currentMonth}
                    </HeaderMonth>
                    <HeaderMyPageButton onClick={() => navigate('/')}>
                        <IconUserName/>
                    </HeaderMyPageButton>
                </>
            ) : (
                <>
                    <HeaderBackButton onClick={() => navigate(-1)}>
                        <BackButton />
                    </HeaderBackButton>
                    <HeaderToday>
                        {currentDate}
                    </HeaderToday>
                    <HeaderMyPageButton onClick={() => navigate('/')}>
                        <IconUserName />
                    </HeaderMyPageButton>
                </>
            )}
        </HeaderWrapper>
    )

}

export default Header;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0rem;
    gap: 0.8rem;

    height: 4.6rem;
    padding: 0.8rem 1.3rem;

    background-color: ${(props) => props.theme.color.background};
    z-index: 10;
`

const HeaderMonth = styled.h1`
    color: ${(props) => props.theme.color.black};
    font-size: 3rem;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    font-family: OmyuPretty;
`;

const HeaderBackButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 6rem;
    height: 4rem;

    background-color: ${(props) => props.theme.color.background};
    border: 0.05rem solid ${(props) => props.theme.color.background};
`;

const HeaderMyPageButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 10rem;
    height: 4rem;

    background-color: ${(props) => props.theme.color.background};
    border: 0.05rem solid ${(props) => props.theme.color.background};
`;

const HeaderToday = styled.h1`
    color: ${(props) => props.theme.color.black};
    font-size: 2.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-family: OmyuPretty;
`;

const getCurrentMonth = () => {
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[currentDate.getMonth()];
};

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