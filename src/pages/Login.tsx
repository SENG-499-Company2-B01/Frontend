import { InputWrapper, LoginBackground, LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { H1, H2 } from '../components/atoms/typography'
import { InputField } from '../components/atoms/input_field'
import { BlackButton } from '../components/atoms/button'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'
import { Navigate } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import axios from 'axios'

export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [userType, setUserType] = useState()
    const [navigate, setNavigate] = useState(false)

    const login = async (e: SyntheticEvent) => {
        e.preventDefault()
        const url = 'http://localhost:8000/signin'
        await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
            }),
        })

        // const content = await response.json()
        // console.log(content)
        // setNavigate(true)
    }
    if (navigate) {
        return <Navigate to='/user' />
    }
    return (
        <form onSubmit={login}>
            <LoginBackground>
                <TitleWrapper>
                    <LogoWrapper src={companyLogo} />
                    <H2>LOG IN</H2>
                </TitleWrapper>
                <InputWrapper>
                    <H1>NetLink ID:</H1>
                    <InputField placeholder='jsmith' type='email' value={email} required onChange={(e: any) => setEmail(e.target.value)} />
                    <H1>Password:</H1>
                    <InputField
                        type='password'
                        value={password}
                        onChange={(e: any) => {
                            setPassword(e.target.value)
                        }}
                    />
                </InputWrapper>
                <BlackButton style={{ width: '260px' }} type='submit'>
                    <H1>SIGN IN</H1>
                </BlackButton>
                <NavUnlisted to='/'>
                    <H1>Forgot your password?</H1>
                </NavUnlisted>
            </LoginBackground>
        </form>
    )
}
