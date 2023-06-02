import { InputWrapper, LoginBackground, LogoWrapper, TitleWrapper } from '../components/login/login'
import companyLogo from '../assets/icons/company_logo_dark.png'
import { H1, H2 } from '../components/atoms/typography'
import { InputField } from '../components/atoms/input_field'
import { BlackButton } from '../components/atoms/button'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'

export const Login = () => {
    return (
        <div>
            <LoginBackground>
                <TitleWrapper>
                    <LogoWrapper src={companyLogo} />
                    <H2>LOG IN</H2>
                </TitleWrapper>
                <InputWrapper>
                    <H1>NetLink ID:</H1>
                    <InputField placeholder='jsmith' />
                    <H1>Password:</H1>
                    <InputField type='password' />
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
        </div>
    )
}
