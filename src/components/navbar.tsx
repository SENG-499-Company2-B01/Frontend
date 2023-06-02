import styled from '@emotion/styled'
import { useState } from 'react'
import { H7 } from './atoms/typography'
import menuIcon from '../assets/icons/menu_default.png'
import closeIcon from '../assets/icons/closed_default.png'
import companyLogo from '../assets/icons/company_logo_dark.png'
import userProfile from '../assets/icons/user_profile_light.png'
import { NavUnlisted } from './atoms/navLink'

const LinkWrapper = styled.div`
    display: flex;
`

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
    padding: 8px 48px;
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

const MenuItemWrapper = styled.img`
    width: 52px;
    &:hover {
        cursor: pointer;
`

const LogoWrapper = styled.img`
    width: 170px;
    height: 50px;
`

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`

const LinkDiv = styled.div`
    border-radius: 0px;
    gap: 32px;
    align-items: center;
    display: flex;
`

const Circle = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    position: absolute;
    background-color: 2c2a2a;
    opacity: 20%;
`

export const NavBarProf = () => {
    return (
        <StickyContainer>
            <NavWrapper>
                <LogoWrapper src={companyLogo} />
                <LinkDiv>
                    <NavUnlisted to={'/'}>
                        <H7>SCHEDULING PREFERENCES</H7>
                    </NavUnlisted>
                    <UserWrapper>
                        <NavUnlisted to={'/user'}>
                            <H7>ACCOUNT</H7>
                        </NavUnlisted>
                        <ProfileWrapper src={userProfile} />
                    </UserWrapper>
                </LinkDiv>
            </NavWrapper>
        </StickyContainer>
    )
}

export const NavBarAdmin = () => {
    let menu
    const [showMenu, setShowMenu] = useState(false)
    return (
        <StickyContainer>
            <NavWrapper>
                <MenuWrapper>
                    <MenuItemWrapper src={showMenu ? closeIcon : menuIcon} alt='menu' onClick={() => setShowMenu(!showMenu)} />
                    <LogoWrapper src={companyLogo} />
                </MenuWrapper>
                <UserWrapper>
                    <NavUnlisted to='/'>
                        <H7>ADMIN</H7>
                    </NavUnlisted>

                    <ProfileWrapper src={userProfile} />
                </UserWrapper>
            </NavWrapper>
        </StickyContainer>
    )
}
