import { BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { goToTop, NavBarProf } from '../components/navbar'
import { useEffect } from 'react'
import { SimpleLink } from '../components/atoms/navLink'
import { ProfessorHowTo } from './HowTo'

const url = 'http://localhost:8000/users'

export const ProfHomepage = () => {
    useEffect(() => {
        ;(async () => {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
            })
        })()
    })
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
                        <SimpleLink to='/ProfPreferencePage' onClick={goToTop}>
                            <BlackButton className='bt2'>
                                <H1>SET YOUR PREFERENCES</H1>
                            </BlackButton>
                        </SimpleLink>
                    </div>
                </div>
            </div>
            <ProfessorHowTo />
        </div>
    )
}
