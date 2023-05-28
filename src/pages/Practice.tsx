import { MediumBlackButton, MediumBlueButton, MediumRedButton } from '../components/atoms/button'
import { H1 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { NavUnlisted } from '../components/atoms/navLink'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Page to display created components

export const Practice = () => {
    return (
        <div>
            <HomeBackground>
                <H1>Welcome to the practice page</H1>
                <MediumBlackButton>
                    <H1>Black Button</H1>
                </MediumBlackButton>
                <MediumRedButton>
                    <H1>Red Button</H1>
                </MediumRedButton>
                <MediumBlueButton>
                    <H1>Blue Button</H1>
                </MediumBlueButton>
                <NavUnlisted to='/Home'>Home</NavUnlisted>
                <NavUnlisted to='/'>About</NavUnlisted>
            </HomeBackground>
        </div>
    )
}
