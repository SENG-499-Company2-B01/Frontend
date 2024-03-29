import { InputWrapper, LoginBackground, LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { H1, H2 } from '../components/atoms/typography'
import { InputField } from '../components/atoms/input_field'
import { BlackButton } from '../components/atoms/button'
import { NavUnlisted } from '../components/atoms/navLink'
import { useNavigate } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import PreLoader from '../components/Loading/PreLoader'

export const Login = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const login = async (e: SyntheticEvent) => {
        setErrorMessage('')
        e.preventDefault()
        setLoading(true)

        const url = process.env.REACT_APP_BACKEND_URL + '/login'

        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Invalid username or password')
                }
            })
            .then((data) => {
                if (!data.token) {
                    throw new Error('Invalid username or password')
                }
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('status', 'login')
                localStorage.setItem('username', String(username))
                if (data.usertype == 'admin') {
                    console.log('admin!')
                    localStorage.setItem('user', 'admin')
                } else {
                    console.log('prof!')
                    localStorage.setItem('user', 'prof')
                }
                navigate('/user')
            })
            .catch((error) => {
                console.log(error)
                if (error.message) {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage('An error has occurred')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <form onSubmit={login}>
            <LoginBackground>
                <TitleWrapper>
                    <LogoWrapper src={companyLogo} />
                    <H2>LOG IN</H2>
                </TitleWrapper>
                <H1 style={{ color: 'red' }}>{errorMessage}</H1>
                <InputWrapper>
                    <H1>Username:</H1>
                    <InputField placeholder='John.Smith' value={username} required onChange={(e: any) => setUsername(e.target.value)} />
                    <H1>Password:</H1>
                    <InputField
                        type='password'
                        value={password}
                        required
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
