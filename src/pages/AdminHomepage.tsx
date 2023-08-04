import { BlackButton } from '../components/atoms/button'
import { H1, H2, H3 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import { useEffect, useState } from 'react'
import { AdminHowTo } from './HowTo'
import DropdownMenu from '../components/atoms/term_dropdown'
import { Navigate } from 'react-router-dom'
import YearDropdownMenu from '../components/atoms/year_dropdown'
import styled from '@emotion/styled'
import { IProfessor } from './Professor.type'
import { ApprovedCard, CardsWrapper, LogoWrapper, UnapprovedCard } from '../components/Generate/generate'
import Check from '../assets/icons/Check_ring.png'
import XMark from '../assets/icons/Dell.png'

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    align-items: center;
`

export const AdminHomepage = () => {
    const [users, setUsers] = useState([] as IProfessor[])
    const [approvedSchedules, setApprovedSchedules] = useState(0)
    const [unapprovedSchedules, setUnapprovedSchedules] = useState(0)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/users'
        await fetch(url, {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setUsers(data)
            })
    }

    useEffect(() => {
        const approved = users.filter((user) => user.pref_approved === true)
        const unapproved = users.filter((user) => user.pref_approved === false)
        setApprovedSchedules(approved.length)
        setUnapprovedSchedules(unapproved.length)
    }, [users])

    console.log(localStorage)
    const [term, setTerm] = useState(false)
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
        <div>
            <NavBarAdmin />
            <form onSubmit={generateSchedule}>
                <div className='cen'>
                    <div className='row'>
                        <div className='col'>
                            <span>
                                <H2>Simple</H2>
                                <H2 className='tex_sch'>Scheduling</H2>
                                <H2>For Professors</H2>
                            </span>
                        </div>
                        <div className='col'>
                            <p className='para'> We create schedules for UVic Professors based on personal prefences to better their teaching experience.</p>
                            <DropdownContainer>
                                <DropdownMenu label={'Term'} data={['Fall', 'Spring', 'Summer']} />
                                <YearDropdownMenu label={'Year'} data={[2023, 2024, 2025, 2026]} />
                            </DropdownContainer>

                            <BlackButton className='bt2' type='submit'>
                                <H1>GENERATE SCHEDULE</H1>
                            </BlackButton>
                        </div>
                    </div>
                    <div className='row'>
                        <CardsWrapper>
                            <ApprovedCard>
                                <LogoWrapper src={Check} />
                                <H2>{approvedSchedules}</H2>
                                <H3>Approved preferences</H3>
                            </ApprovedCard>
                            <UnapprovedCard>
                                <LogoWrapper src={XMark} />
                                <H2>{unapprovedSchedules}</H2>
                                <H3>Unapproved preferences</H3>
                            </UnapprovedCard>
                        </CardsWrapper>
                    </div>
                </div>
                {/* {isGenerated ? <BasicCalendar /> : null} */}
                <AdminHowTo />
            </form>
        </div>
    )
}
