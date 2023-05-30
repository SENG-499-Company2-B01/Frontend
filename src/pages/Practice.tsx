import { MediumBlackButton, MediumBlueButton, MediumRedButton } from '../components/atoms/button'
import { H1 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'

// Page to display created components

export const Practice = () => {
    return (
        <div>
            <HomeBackground>
                <H1>Welcome to the practice page</H1>
                <MediumBlackButton>
                    <H1>Black Button</H1>
                </MediumBlackButton>
                <MediumRedButton>
                    <H1>Red Button</H1>
                </MediumRedButton>
                <MediumBlueButton>
                    <H1>Blue Button</H1>
                </MediumBlueButton>
                <InputField placeholder='jsmith'></InputField>
            </HomeBackground>
        </div>
    )
}
