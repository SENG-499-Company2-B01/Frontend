import { BlackButton, MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { goToTop, NavBarAdmin } from '../components/navbar'
import { useEffect } from 'react'
import { AdminHowTo } from './HowTo'

const url = 'http://localhost:8000/users'

export const AdminHomepage = () => {
    // useEffect(() => {
    //     ;(async () => {
    //         await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'text/plain',
    //                 Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //             },
    //         })
    //     })()
    // })
    return (
        <div>
            <NavBarAdmin />
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
                        <SimpleLink to='/generate' onClick={goToTop}>
                            <BlackButton className='bt2'>
                                <H1>GENERATE SCHEDULE</H1>
                            </BlackButton>
                        </SimpleLink>
                    </div>
                </div>
            </div>
            <AdminHowTo />
        </div>
    )
}
