import { InputWrapper, LoginBackground, LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { H1, H2 } from '../components/atoms/typography'
import { InputField } from '../components/atoms/input_field'
import { BlackButton } from '../components/atoms/button'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'
import { Navigate } from 'react-router-dom'
import { SyntheticEvent, useState, useEffect } from 'react'
import { Home } from './Home'
import Preloader from '../components/Loading/PreLoader'
import { ProfHomepage } from './ProfHomepage'
import { AdminHomepage } from './AdminHomepage'
import PreLoader from '../components/Loading/PreLoader'

export const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [navigate, setNavigate] = useState(false)

    const login = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)

        // console.log(username)
        // console.log(password)
        const url = process.env.REACT_APP_BACKEND_URL + '/login'
        await fetch(url, {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                setLoading(false)
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('jwt', data.jwt)
                localStorage.setItem('status', 'login')
            })

        if (username == 'Rich.Little') {
            console.log('admin!')
            localStorage.setItem('username', String(username))
            localStorage.setItem('user', 'admin')
            setNavigate(true)
        } else {
            console.log('prof!')
            localStorage.setItem('username', String(username))
            localStorage.setItem('user', 'prof')
            setNavigate(true)
        }
        console.log(localStorage)
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
                    <H1>Username:</H1>
                    <InputField placeholder='John.Smith' value={username} required onChange={(e: any) => setUsername(e.target.value)} />
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
                {loading ? <PreLoader /> : ''}
                <NavUnlisted to='/'>
                    <H1>Forgot your password?</H1>
                </NavUnlisted>
            </LoginBackground>
        </form>
    )
}
