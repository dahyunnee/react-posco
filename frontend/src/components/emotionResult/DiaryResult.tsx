import styled from 'styled-components';
import InnerDiaryResult from './InnerDiaryResult';

function DiaryResult(props: any)  {
    return (
        <DiaryResultContainer>
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
    height: 80%;
    
    padding: 10rem 10rem 10rem; 
    margin: 20px 10px 20px 10px;
`;
