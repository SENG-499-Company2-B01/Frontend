import { BlackButton } from '../components/atoms/button'
import { SimpleLink } from '../components/atoms/navLink'
import { H1, H2 } from '../components/atoms/typography'
import React from 'react'
import { LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { HomeBackground } from '../components/home/background'

export const LogoutPage = () => {
    // localStorage.clear()
    return (
        <>
            <HomeBackground>
                <LogoWrapper src={companyLogo} />
                <span>
                    <H2> You have been successfully logged out! </H2>
                </span>
                <SimpleLink to='/'>
                    <BlackButton>
                        <H1>Sign in</H1>
                    </BlackButton>
                </SimpleLink>
            </HomeBackground>
        </>
    )
}

export default LogoutPage
