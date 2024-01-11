import styled from 'styled-components';
import ExpertImage from '../assets/image/expertImage.png';
import TitiImage from '../assets/image/titiImage.png';
import ExplainImage from '../assets/image/explainImage.png';
import { IconUserName } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    
    return (
        <MainPageWrapper>
            <ImagesWrapper>
                <Image src = { ExpertImage }></Image>
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
            </ImagesWrapper>
        </MainPageWrapper>
    );
};

export default MainPage;

const MainPageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 100px;

    width: 90%;
    margin: 10px 10px 10px 10px;
`

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    margin: 10px 10px 10px 10px;
    padding: 20px 20px 20px 20px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;

    margin: 10px 10px 10px 10px;
    padding: 30px 20px 30px 20px;
`;

const ButtonWrapper = styled.div`
    margin-left: auto;
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
    font-size: 1.4rem;
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