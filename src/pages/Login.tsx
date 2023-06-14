import { InputWrapper, LoginBackground, LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { H1, H2 } from '../components/atoms/typography'
import { InputField } from '../components/atoms/input_field'
import { BlackButton } from '../components/atoms/button'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'
import { useState } from 'react'

export const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [userType, setUserType] = useState()

    function login(e: any) {
        e.preventDefault()
        const url = 'http://localhost:8000/' + 'login'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
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
                    <InputField
                        placeholder='jsmith'
                        value={username}
                        onChange={(e: any) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <H1>Password:</H1>
                    <InputField
                        type='password'
                        value={password}
                        onChange={(e: any) => {
                            setPassword(e.target.value)
                        }}
                    />
                </InputWrapper>
                <SimpleLink to='/user'>
                    <BlackButton style={{ width: '260px' }}>
                        <H1>SIGN IN</H1>
                    </BlackButton>
                </SimpleLink>
                <NavUnlisted to='/'>
                    <H1>Forgot your password?</H1>
                </NavUnlisted>
            </LoginBackground>
        </form>
    )
}
