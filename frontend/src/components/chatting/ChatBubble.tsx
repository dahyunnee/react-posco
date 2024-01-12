import styled from 'styled-components';
import TitiChat from '../../assets/image/TitiChat.png';
import PersonChat from '../../assets/image/PersonChat.png';

interface ChatBubbleProps {
    message: string;
    time: string;
    isAI: boolean;
    name: string;
}

function ChatBubble({ message, isAI, time, name }: ChatBubbleProps) {
    const imageSrc = isAI ? TitiChat : PersonChat;
    console.log(time);
    return isAI ? (
        <ChatBubbleContainer  direction='left'>
            <ImageContainer>
                <ChatProfileImg src={imageSrc} alt="User" />
            </ImageContainer>
            <NameAndMessageContainer direction='left'>
                <NameText>{name}</NameText>
                <MessageContainer>
                    <MessageText>{message}</MessageText>
                </MessageContainer>
            </NameAndMessageContainer>
            <MsgTimeText>{time}</MsgTimeText>
        </ChatBubbleContainer>
    ) : (
        <ChatBubbleContainer direction='right'>
            <MsgTimeText>{time}</MsgTimeText>
            <NameAndMessageContainer direction='right'>
                <NameText>{name}</NameText>
                <MessageContainer>
                    <MessageText>{message}</MessageText>
                </MessageContainer>
            </NameAndMessageContainer>
            <ImageContainer>
                <ChatProfileImg src={imageSrc} alt="User" />
            </ImageContainer>
        </ChatBubbleContainer>
    );
}

export default ChatBubble;

const NameAndMessageContainer = styled.div<{ direction: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ direction }) => direction === 'left' ? 'flex-start' : 'flex-end'};
`;

const NameText = styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const ChatBubbleContainer = styled.div<{ direction: string }>`
    display: flex;
    align-items: center;
    justify-content: ${({direction})=> direction};
    margin: 10px;
    width : 100%;
`;

const ChatProfileImg = styled.img`
    width: 100px;
    height: 100px;
`;

const ImageContainer = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
`;

const MessageContainer = styled.div`
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 10px;
    padding: 10px;
`;

const MessageText = styled.span`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const MsgTimeText = styled.p`
    font-size: 1rem;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;