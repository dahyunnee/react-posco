import { Link, useLocation } from 'react-router-dom';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components';
import { IconUserName, BackButton } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentMonth = getCurrentMonth();
    
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
            ) : location.pathname.includes('/result/') ? (
                <>
                    <HeaderBackButton onClick={() => navigate(-1)}>
                        <BackButton />
                    </HeaderBackButton>
                    <HeaderEmotionResult>
                        오늘의 일기 감정 분석 결과
                    </HeaderEmotionResult>
                    <HeaderMyPageButton onClick={() => navigate('/')}>
                        <IconUserName />
                    </HeaderMyPageButton>
                </>
            ) : (
                <>
                    
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

    background: linear-gradient(to bottom, ${(props) => props.theme.color.yellow00}, ${(props) => props.theme.color.white});
    //background-color: ${(props) => props.theme.color.yellow00};
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

    background: none;
    border: none;
`;

const HeaderMyPageButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 10rem;
    height: 4rem;

    background: none;
    border: none;
`;

const HeaderEmotionResult : any = styled.h1`
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