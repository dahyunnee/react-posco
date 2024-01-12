import styled from 'styled-components';
import ExpertImage from '../assets/image/expertImage.png';
import TitiImage from '../assets/image/titiImage.png';
import ExplainImage from '../assets/image/explainImage.png';
import { IconUserName } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    const counselorPhoneNumber = "010-1234-5678";

    return (
        <MainPageWrapper>
            <ImagesWrapper>
                <Image src = { ExpertImage }></Image>
                <ExplainTextWrapper>
                    <ExplainText>
                        심리 상담 전문가와 함께 더 나은 내일을 만들어보세요.
                    </ExplainText>
                    <PhoneText>
                        📞 심리 상담가 : {counselorPhoneNumber}
                    </PhoneText>
                </ExplainTextWrapper>
            </ImagesWrapper>
            <ImagesWrapper>
                <Image src = { TitiImage }></Image>
                <ButtonWrapper>
                    <Button onClick={() => navigate('/chat')}>
                        <IconUserName />
                        <ButtonText>🤖 채팅하기</ButtonText>
                    </Button>
                </ButtonWrapper>
                <Image src = { ExplainImage }></Image>
                <ExplainTextWrapper>
                    <ExplainText>
                        ✨ 일기를 쓰면 내 감정을 분석해줘요!
                    </ExplainText>
                </ExplainTextWrapper>
                <ButtonWrapper>
                    <Button onClick={() => navigate('/diary')}>
                        <IconUserName />
                        <ButtonText>✏️ 일기쓰러가기</ButtonText>
                    </Button>
                </ButtonWrapper>
            </ImagesWrapper>
        </MainPageWrapper>
    );
};

export default MainPage;

const MainPageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 120px;

    width: 60%;
    margin: 10px auto;
    align-items: center;
`

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
`;

const Image = styled.img`
    width: 90%;
    height: auto;
    gap: 200px;
    left: 20px;

    margin: 10px 10px 50px 30px;
    padding: 10px 10px 10px 10px;
    
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    margin-top: auto; 
    margin-bottom: 200px; 
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
    font-size: 1.3rem;
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

const ExplainTextWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 15px;
    text-align: center;
`;

const ExplainText = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${(props) => props.theme.color.black};
    font-family: OmyuPretty;
    margin-bottom: 10px;
`;

const PhoneText = styled.p`
    font-size: 1rem;
    color: ${(props) => props.theme.color.black};
    font-family: OmyuPretty;
`;