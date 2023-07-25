import styled from '@emotion/styled'
import { useState } from 'react'
import checkmark from '../../assets/icons/check.svg'
import { H7, H8 } from './typography'

// Styling for checkbox
const StyledCheckbox = styled.div`
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border-radius: 4;
    margin-right: 8px;
    border: solid 2px #999999;
    &.default:hover {
        border-color: #545454;
    }
    &.checked {
        background-color: black;
        border: none;
    }
    &.checked:hover {
        background-color: #545454;
    }
`
// Image that does not display if given className hide
const StyledImg = styled.img`
    &.hide {
        display: none;
    }
`
// Wrapper for CheckBox
const CheckboxWrapper = styled.div`
    display: flex;
`
/*
 * Checkbox component
 * Display custom label by passing in your text through the label prop
 */
export const Checkbox = (props: any) => {
    const [checked, setChecked] = useState(true)
    return (
        <CheckboxWrapper>
            <StyledCheckbox
                className={checked ? 'default' : 'checked'}
                onClick={() => {
                    setChecked(!checked)
                    props.onClick(checked)
                }}
            >
                <StyledImg className={checked ? 'hide' : ''} src={checkmark}></StyledImg>
            </StyledCheckbox>
            <H7>{props.label}</H7>
        </CheckboxWrapper>
    )
}
