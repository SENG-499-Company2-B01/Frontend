import { BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'
import { useEffect } from 'react'

const url = 'http://localhost:8000/signin'

export const ProfHomepage = () => {
    useEffect(() => {
        ;(async () => {
            await fetch(url, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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
                        <BlackButton className='bt2'>
                            <H1>SET YOUR PREFERENCES</H1>
                        </BlackButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
