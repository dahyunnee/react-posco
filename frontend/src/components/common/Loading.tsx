import { Link, useLocation } from 'react-router-dom';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components';
import { IconUserName, BackButton } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

export function Loading() {
    const location = useLocation();
    const navigate = useNavigate();

    
    return (
            <Background>
                <LoadingText>잠시만 기다려 주세요.</LoadingText>
             </Background>
        );
    }

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;