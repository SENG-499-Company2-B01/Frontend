import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import arrowUp from '../../assets/icons/keyboard_arrow_up.svg'
import arrowDown from '../../assets/icons/keyboard_arrow_down.svg'
import { H1, H7 } from './typography'

//container for the entire component
const DropDownContainer = styled.div`
    width: 224px;
`
//image wrapper for arrow icons
const ArrowIcon = styled.img``

//container for header
const DropDownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background: #fcfcfc;
    &.close {
        color: grey;
        border: 2px solid grey;
        &:hover {
            border: 2px solid #6885ce;
        }
    }
    &.open {
        color: #000000};
        border: 2px solid #6885ce;
    }
    &.selected {
        color: #000000;
        border: 2px solid grey;
    }
`
//margin for label text
const LabelText = styled(H1)`
    margin-bottom: 8px;
`
//containers for dropdown list and items
const DropDownListContainer = styled.div``
const DropDownList = styled.ul`
    padding: unset;
    margin: unset;
    margin-top: 8px;
    background-color: #fcfcfc;
    box-sizing: border-box;
    color: #000000;
    border: 2px solid #000000;
    overflow-y: scroll;
`
//list component for items
const ListItem = styled.li`
    padding: 8px 12px;
    list-style: none;
    background-color: #fcfcfc;
    font-family: Montserrat-Regular;
    font-size: 20px;
    line-height: 123.05%;
    &:hover {
        color: #fcfcfc;
        background-color: #6885ce;
    }
`

export default function YearDropdownMenu(props: any) {
    //list of countries
    const data = props.data
    const length = data.length

    //hook to change selected value
    const [selectedValue, setSelectedValue] = useState('Select')

    //hook to show dropdown
    const [showDropDown, setShowDropDown] = useState(false)

    //hook for header styling
    const [header, setHeader] = useState('close')

    //handle dropdown selection
    const selectHandler = (event: any) => {
        setShowDropDown(false)
        setSelectedValue(event.target.getAttribute('value'))
        localStorage.setItem('year', event.target.getAttribute('value'))
        console.log(localStorage)
    }

    const refClick = useRef<any>(null)

    //effect to check if there is a click outside of component
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (refClick.current && !refClick.current.contains(event.target)) {
                setShowDropDown(false)
                if (selectedValue == 'Select') {
                    setHeader('close')
                } else {
                    setHeader('selected')
                }
            }
        }
        //bind the event listener
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            //unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selectedValue])

    //if data length is greater than 3, set the list size a fixed height
    const lengthFlag = length >= 3 ? '148px' : 'unset'

    //handles click on header
    const handleClick = () => {
        if (showDropDown == true) {
            if (selectedValue == 'Select') {
                setHeader('close')
            }
            setShowDropDown(false)
        }
        if (showDropDown == false) {
            setShowDropDown(true)
            setHeader('open')
        }
    }

    //map and create new list instances
    const showList = data.map((item: any, index: any) => (
        <ListItem key={index} value={item} onClick={selectHandler}>
            {item}
        </ListItem>
    ))

    //show dropdown list when arrow icon is clicked
    let dropDown
    if (showDropDown) {
        dropDown = (
            <DropDownListContainer>
                <DropDownList style={{ height: lengthFlag }}>{showList}</DropDownList>
            </DropDownListContainer>
        )
    }

    return (
        <DropDownContainer ref={refClick}>
            <LabelText>{props.label}</LabelText>
            <DropDownHeader className={header} onClick={handleClick}>
                <H1>{selectedValue}</H1>
                <ArrowIcon src={showDropDown ? arrowUp : arrowDown} alt='dropDown' />
            </DropDownHeader>
            {dropDown}
        </DropDownContainer>
    )
}
