import { styled } from 'styled-components';

function InnerDiaryResult(props: any) {
    return (
        <InnerDiaryResultContainer>
            <div>
                dskfksa <br/>
                dsafjkdsa
            </div>
            
        </InnerDiaryResultContainer>
    )
}

export default InnerDiaryResult;


const InnerDiaryResultContainer = styled.div`
    background-color: ${({ theme }) => theme.color.yellow02};
    border-radius: 30px;

    position: absolute;
    width: 100%;
    height: 85%;
    bottom: 0;
    left: 0;
    right: 0;
`;