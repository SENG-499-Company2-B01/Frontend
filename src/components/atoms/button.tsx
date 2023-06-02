import styled from '@emotion/styled'

export const MediumWhiteButton = styled.button`
    padding: 16px 40px;
    color: #000000;
    border-radius: 32px;
    background-color: #f4f5f8;
    display: flex;
    align-items: center;
    border: 2px solid #c8c8c8;
    justify-content: center;
    &:hover {
        background-color: #c8c8c8;
    }
    &:active {
        border: 2px solid #2c2a2a;
    }
`

export const MediumBlackButton = styled.button`
    height: 36px;
    border-radius: 32px;
    font-family: Monsterrat-Medium;
    font-size: 18px;
    color: #ffffff;
    padding: 12px 24px;
    border: 2px;
    background-color: #1f2330;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #777a85;
    }
    &:active {
        border: 2px solid #1f2330;
    }
`

export const MediumRedButton = styled(MediumBlackButton)`
    background-color: #7d2d3a;
    &:hover {
        background-color: #b05f6c;
    }
    &:active {
        border: 2px solid #7d2d3a;
    }
`

export const MediumBlueButton = styled(MediumBlackButton)`
    background-color: #364da8;
    &:hover {
        background-color: #6379cf;
    }
    &:active {
        border: 2px solid #364da8;
    }
`

export const BlackButton = styled.button`
    background-color: #2c2a2a;
    color: #ffffff;
    padding: 16px 40px;
    display: flex;
    font-family: Monsterrat-Medium;
    border-radius: 32px;
    align-items: center;
    border: 2px solid transparent;
    justify-content: center;
    &:hover {
        background-color: #585757;
    }
    &:active {
        border: 2px solid #2c2a2a;
    }
`
