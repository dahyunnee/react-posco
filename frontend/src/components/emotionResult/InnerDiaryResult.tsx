import { styled } from 'styled-components';

function InnerDiaryResult(props: any) {
    return (
        <InnerDiaryResultContainer>
            <DiaryContextWrapper>    
                <DiaryContext>
                    test test test test test test test test test test test test test test test test test test test test test test test test test test  <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    t <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                    test <br/>
                </DiaryContext>
            </DiaryContextWrapper>
        </InnerDiaryResultContainer>
    )
}

export default InnerDiaryResult;


const InnerDiaryResultContainer = styled.div`
    background-color: ${({ theme }) => theme.color.yellow02};
    border-radius: 30px;

    position: absolute;
    width: 100%;
    height: 80%;
    bottom: 0;
    left: 0;
    right: 0;
`;

const DiaryContextWrapper = styled.div`
    padding: 20px; 
    overflow-y: auto; 
    max-height: 80%;
`;

const DiaryContext = styled.p`
    color: ${({ theme }) => theme.color.black};

    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-family: OmyuPretty;
`;