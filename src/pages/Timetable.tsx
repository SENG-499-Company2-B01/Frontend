import 'bootstrap/dist/css/bootstrap.css'
import styled from '@emotion/styled'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import './time.css'
import ProfTable from './ProfTable'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'
import { H1, H2, H6, H7 } from '../components/atoms/typography'
import { SmallBlackButton } from '../components/atoms/button'
import { ApproveContainer } from '../components/timetable/timetable'

const PopupBackground = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
`

const PopupWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 400px;
    z-index: 4;
    flex-direction: column;
    gap: 32px;
    width: 400px;
    background-color: #fcfcfc;
    padding: 16px 64px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`

interface Section {
    num: string
    professor: string
    days: string[]
    start_time: string
    end_time: string
    building: string
    num_seats: string
}

interface Course {
    course: string
    sections: Section[]
}
export const Timetable: React.FC = () => {
    const [timetableData, setTimetableData] = useState<Course[]>([])
    const [loading, setLoading] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [term, setTerm] = useState('')
    const [year, setYear] = useState('')
    const [professorCourses, setProfessorCourses] = useState<Record<string, string[]>>({})
    const [locationCourses, setLocationCourses] = useState<Record<string, Course[]>>({})
    const [activeLink, setActiveLink] = useState('courses')

    const ApprovePopup = () => {
        return (
            <PopupBackground>
                <PopupWrapper>
                    <H6>Schedule Approved!</H6>
                    <SmallBlackButton onClick={() => setIsApproved(false)}>
                        <H7>CLOSE</H7>
                    </SmallBlackButton>
                </PopupWrapper>
            </PopupBackground>
        )
    }
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            const term = localStorage.getItem('term')
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response = await axios
                    .post(
                        'http://localhost:8000/login',
                        {
                            username: 'Rich.Little',
                            password: 'Rich.Little12345',
                        },
                        {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'text/plain',
                            },
                        }
                    )
                    .then(async (response) => {
                        const token = response.data.jwt
                        localStorage.setItem('jwt', token)
                        console.log(localStorage.getItem('jwt'))
                        const response2 = await axios.post(
                            'https://company2-backend.onrender.com/schedules/2023/' + term + '/generate',
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                                    'Content-Type': 'text/plain',
                                },
                            }
                        )
                        const data = response2.data
                        localStorage.setItem('dat', JSON.stringify(data))
                        const parsedData = JSON.parse(localStorage.getItem('dat') || '[]')
                        const locationCoursesData: Record<string, Course[]> = {}
                        setTimetableData(parsedData.terms[0].courses)
                        setTerm(parsedData.terms[0].term)
                        setYear(parsedData.year)
                        const professorCoursesData: Record<string, string[]> = {}
                        parsedData.terms[0].courses.forEach((course: Course) => {
                            course.sections.forEach((section: Section) => {
                                if (professorCoursesData[section.professor]) {
                                    professorCoursesData[section.professor].push(course.course)
                                } else {
                                    professorCoursesData[section.professor] = [course.course]
                                }

                                if (locationCoursesData[section.building]) {
                                    locationCoursesData[section.building].push(course)
                                } else {
                                    locationCoursesData[section.building] = [course]
                                }
                            })
                        })
                        setProfessorCourses(professorCoursesData)
                        setLocationCourses(locationCoursesData)
                        setLoading(false)
                    })
            } catch (error) {
                console.error('Error:', error)
            }
        }
        fetchData()
    }, [])
    const handleLinkClick = (link: string) => {
        setActiveLink(link)
    }

    const approveSchedule = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log('Schedule approved!')
        const url = process.env.REACT_APP_BACKEND_URL + '/schedules/prev'
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(localStorage.getItem('dat')),
        }).then((response) => {
            setIsApproved(true)
            return response
        })
    }
    return (
        <div>
            <NavBarAdmin />
            {loading ? <PreLoader /> : ''}
            {isApproved ? <ApprovePopup /> : ''}
            <H2 className='mai'>Schedule</H2>
            <div className='taa'>
                <h2 className='y'>Term: {term}</h2>
                <h2 className='y'>Year: {year}</h2>
            </div>
            <div className='navy'>
                <ul className='nav nav-pills lis'>
                    <li className='nav-item'>
                        <a className={`nav-link ${activeLink === 'courses' ? 'active' : ''}`} aria-current='page' href='#' onClick={() => handleLinkClick('courses')}>
                            Courses
                        </a>
                    </li>
                    <li className='nav-item dropdown'>
                        <a className={`nav-link ${activeLink === 'professors' ? 'active' : ''}`} href='#' role='button' aria-expanded='false' onClick={() => handleLinkClick('professors')}>
                            Professors
                        </a>
                    </li>
                    <li className='nav-item dropdown'>
                        <a className={`nav-link ${activeLink === 'location' ? 'active' : ''}`} href='#' role='button' aria-expanded='false' onClick={() => handleLinkClick('location')}>
                            Location
                        </a>
                    </li>
                </ul>
            </div>

            <ApproveContainer>
                <SmallBlackButton onClick={() => setIsApproved(true)}>
                    <H7>APPROVE SCHEDULE</H7>
                </SmallBlackButton>
            </ApproveContainer>
            {/* <form onSubmit={approveSchedule}>
    
            </form> */}

            <div className='bottom-content'>
                {activeLink === 'courses' && (
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Section</th>
                                    <th>Professor</th>
                                    <th>Days</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetableData.map((course) =>
                                    course.sections.map((section) => (
                                        <tr key={`${course.course}-${section.num}`}>
                                            <td>{course.course}</td>
                                            <td>{section.num}</td>
                                            <td>{section.professor}</td>
                                            <td>{section.days.join(', ')}</td>
                                            <td>{section.start_time}</td>
                                            <td>{section.end_time}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeLink === 'professors' && (
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Professor</th>
                                    <th>Courses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(professorCourses).map(([professor, courses]) => (
                                    <tr key={professor}>
                                        <td>{professor}</td>
                                        <td>{courses.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeLink === 'location' && (
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Building</th>
                                    <th>Course</th>
                                    <th>Days</th>
                                    <th>Num Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(locationCourses).map(([building, courses]) =>
                                    courses.map((course, index) => (
                                        <tr key={`${building}-${index}`}>
                                            {index === 0 && <td rowSpan={courses.length}>{building}</td>}
                                            <td>{course.course}</td>
                                            <td>{course.sections[0].days.join(', ')}</td>
                                            <td>{course.sections[0].num_seats}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
