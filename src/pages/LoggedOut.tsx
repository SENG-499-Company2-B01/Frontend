import { BlackButton } from '../components/atoms/button'
import { SimpleLink } from '../components/atoms/navLink'
import { H1, H2 } from '../components/atoms/typography'
import React from 'react'
import { LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'

export const LogoutPage = () => {
    localStorage.clear()
    return (
        <>
            <div className='cen'>
                <LogoWrapper src={companyLogo} />
                <span>
                    <H2> You have been successfully logged out! </H2>
                </span>
                <SimpleLink to='/'>
                    <BlackButton>
                        <H1>Sign in</H1>
                    </BlackButton>
                </SimpleLink>
            </div>
        </>
    )
}

export default LogoutPage
