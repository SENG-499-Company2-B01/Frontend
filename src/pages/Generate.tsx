import { BlackButton } from '../components/atoms/button'
import { H1, H2, H3 } from '../components/atoms/typography'
import { ApprovedCard, CardsWrapper, GenerateBackground, LogoWrapper, UnapprovedCard } from '../components/Generate/generate'
import { NavBarAdmin } from '../components/navbar'
import Check from '../assets/icons/Check_ring.png'
import XMark from '../assets/icons/Dell.png'
import { Form } from 'antd'
import { SyntheticEvent, useRef, useState } from 'react'
import PreLoader from '../components/Loading/PreLoader'
import DropdownMenu from '../components/atoms/term_dropdown'
import { Timetable } from './Timetable'

export const Generate = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)
    const scrollRef = useRef<any>()
    // console.log(localStorage.getItem('jwt'))

    const createSchedule = async (e: SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        const term = localStorage.getItem('term')

        const url = process.env.REACT_APP_BACKEND_URL + '/schedules/' + 2023 + '/' + term + '/generate'
        console.log('Given url: ' + url)
        await fetch(url, {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then((response) => {
                setLoading(false)
                return response.json()
                // return response.formData()
            })
            .then((data) => {
                console.log(data)
            })
        setIsGenerated(true)
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        localStorage.setItem('generated', 'true')
    }

    const approveSchedule = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log('Schedule approved!')
    }

    return (
        <form onSubmit={createSchedule}>
            <NavBarAdmin />
            <GenerateBackground>
                <H2>Generate Schedule</H2>
                <CardsWrapper>
                    <ApprovedCard>
                        <LogoWrapper src={Check} />
                        <H2>17</H2>
                        <H3>Approved preferences</H3>
                    </ApprovedCard>
                    <UnapprovedCard>
                        <LogoWrapper src={XMark} />
                        <H2>2</H2>
                        <H3>Unapproved preferences</H3>
                    </UnapprovedCard>
                </CardsWrapper>
                <DropdownMenu label={'Term'} data={['Fall', 'Spring', 'Summer']} />
                <BlackButton type='submit'>
                    <H1>START GENERATING</H1>
                </BlackButton>
                {loading ? <PreLoader /> : ''}
                {/* {isGenerated ? <ProfTable />} */}
            </GenerateBackground>
            <div ref={scrollRef}></div>
            {isGenerated ? (
                <div style={{ height: '95vh' }}>
                    <Timetable />
                </div>
            ) : null}
        </form>
    )
}
