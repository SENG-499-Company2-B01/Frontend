import styled from '@emotion/styled'
import { useState } from 'react'
import { H7 } from './atoms/typography'
import menuIcon from '../assets/icons/menu_default.png'
import closeIcon from '../assets/icons/closed_default.png'
import companyLogo from '../assets/icons/company_logo_dark.png'
import userProfile from '../assets/icons/user_profile_light.png'
import { NavUnlisted, SimpleLink } from './atoms/navLink'
import ProfileDropdown, { DropdownContainer } from './atoms/Dropdown_menu'
import { DropdownButton } from 'react-bootstrap'

const StickyContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 10;
`

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fcfcfc;
    padding: 16px 64px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`

const ProfileWrapper = styled.img`
    width: 46px;
    height: 46px;
`

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

const LogoWrapper = styled.img`
    width: 170px;
    height: 50px;
`

const LinkDiv = styled.div`
    border-radius: 0px;
    gap: 32px;
    align-items: center;
    display: flex;
`
export const goToTop = () => {
    window.scrollTo({
        top: 0,
    })
}

export const NavBarProf = () => {
    const username = localStorage.getItem('username')
    return (
        <StickyContainer>
            <NavWrapper>
                <SimpleLink to={'/user'} onClick={goToTop}>
                    <LogoWrapper src={companyLogo} />
                </SimpleLink>
                <LinkDiv>
                    <NavUnlisted to={'/ProfPreferencePage'} onClick={goToTop}>
                        <H7>SCHEDULING PREFERENCES</H7>
                    </NavUnlisted>
                    <UserWrapper>
                        <ProfileDropdown name={String(username).toUpperCase()} />
                        <ProfileWrapper src={userProfile} />
                    </UserWrapper>
                </LinkDiv>
            </NavWrapper>
        </StickyContainer>
    )
}

export const NavBarAdmin = () => {
    const username = localStorage.getItem('username')
    return (
        <StickyContainer>
            <NavWrapper>
                <SimpleLink to={'/user'} onClick={goToTop}>
                    <LogoWrapper src={companyLogo} />
                </SimpleLink>

                <LinkDiv>
                    <NavUnlisted to={'/generate'} onClick={goToTop}>
                        <H7>GENERATE SCHEDULE</H7>
                    </NavUnlisted>
                    <NavUnlisted to={'/timetable'} onClick={goToTop}>
                        <H7>VIEW SCHEDULE</H7>
                    </NavUnlisted>
                    <NavUnlisted to={'/Preferences'} onClick={goToTop}>
                        <H7>VIEW PROFESSORS</H7>
                    </NavUnlisted>
                    <NavUnlisted to={'/CreateAccountPage'} onClick={goToTop}>
                        <H7>CREATE ACCOUNT</H7>
                    </NavUnlisted>
                    <UserWrapper>
                        <ProfileDropdown name={String(username).toUpperCase()} />
                        <ProfileWrapper src={userProfile} />
                    </UserWrapper>
                </LinkDiv>
            </NavWrapper>
        </StickyContainer>
    )
}
