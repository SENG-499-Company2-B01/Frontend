import styled from '@emotion/styled'

export const GenerateBackground = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    gap: 64px;
    justify-content: center;
    align-items: center;
`
export const CardsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 64px;
`

export const LogoWrapper = styled.img`
    width: 56px;
    height: 56px;
`

export const ApprovedCard = styled.div`
    display: flex;
    width: 284px;
    height: 284px;
    padding: 10px;
    background: #6885ce;
    color: white;
    border-radius: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
    gap: 8px;
`

export const UnapprovedCard = styled(ApprovedCard)`
    background: #fffbcc;
    color: #2c2a2a;
`