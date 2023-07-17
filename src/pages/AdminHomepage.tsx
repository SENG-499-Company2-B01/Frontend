import { BlackButton, MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted, SimpleLink } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { goToTop, NavBarAdmin } from '../components/navbar'
import { useEffect, useState } from 'react'
import { AdminHowTo } from './HowTo'
import BasicCalendar from '../components/calendar/BasicCalendar'
import DropdownMenu from '../components/atoms/term_dropdown'
import { Navigate } from 'react-router-dom'

export const AdminHomepage = () => {
    console.log(localStorage)
    const [term, setTerm] = useState(false)
    localStorage.setItem('term', '')
    const generateSchedule = () => {
        console.log(localStorage.getItem('term'))
        if (localStorage.getItem('term') != '') {
            setTerm(true)
        } else {
            console.log('false')
        }
    }
    if (term) {
        return <Navigate to='/timetable' />
    }

    return (
        <form onSubmit={generateSchedule}>
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
                        <DropdownMenu label={'Term'} data={['Fall', 'Spring', 'Summer']} />
                        <BlackButton className='bt2' type='submit'>
                            <H1>GENERATE SCHEDULE</H1>
                        </BlackButton>
                    </div>
                </div>
            </div>
            {/* {isGenerated ? <BasicCalendar /> : null} */}
            <AdminHowTo />
        </form>
    )
}
