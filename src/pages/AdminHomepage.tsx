import { MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'

export const AdminHomepage = () => {
    return (
        <div>
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
                        <MediumWhiteButton className='bt2'>
                            <H1>GENERATE SCHEDULE</H1>
                        </MediumWhiteButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
