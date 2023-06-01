import styled from '@emotion/styled'
import { LogoWrapper } from '../login/login'
import companyLogo from '../../assets/icons/company_logo_dark.png'
import userCircle from '../../assets/icons/User_cicrle_light.png'
import { NavUnlisted } from './navLink'

const NavBarProf_style = styled.nav`
    height: 82px;
    width: 100%;
    left: -911px;
    top: -1236px;
    border-radius: 0px;
    padding: 16px 48px 16px 48px;
    justify-content: space-between;
    display: flex;
`

const LinkDiv = styled.div`
    height: 46px;
    width: 407px;
    left: 1057px;
    top: 16px;
    border-radius: 0px;
    justify-content: space-between;
    display: flex;
`

export const NavBarProf = () => {
    return (
        <NavBarProf_style>
            <LogoWrapper src={companyLogo} />
            <LinkDiv>
                <NavUnlisted to={'/'}>SCHEDULING PREFERENCES</NavUnlisted>
                <NavUnlisted to={'/'}>
                    ACCOUNT
                    <img src={userCircle} width='24px' />
                </NavUnlisted>
            </LinkDiv>
        </NavBarProf_style>
    )
}
