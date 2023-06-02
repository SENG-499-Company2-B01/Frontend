import { MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton, BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'

export const ProfHomepage = () => {
    return (
        <div>
            <NavBarProf />
            <div className='cen'>
                <div className='row'>
                    <div className='col'>
                        <span>
                            <H2>Simple</H2>
                            <H2 className='tex_sch'>Scheduling</H2>
                            <H2>For Professors</H2>
                        </span>
                    </div>
                    <div className='col rig'>
                        <p className='para'> We create schedules for UVic Professors based on personal prefences to better their teaching experience.</p>
                        <BlackButton className='bt2'>
                            <H1>SET YOUR PREFERENCES</H1>
                        </BlackButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
