import 'bootstrap/dist/css/bootstrap.css'
import styled from '@emotion/styled'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { useEffect, useState, useRef, SyntheticEvent } from 'react'
import './time.css'
import ProfTable from './ProfTable'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'
import { Button, Modal } from 'react-bootstrap'
import { H1, H2, H6, H7 } from '../components/atoms/typography'
import { SmallBlackButton } from '../components/atoms/button'
import { ApproveContainer } from '../components/timetable/timetable'

const PopupBackground = styled.div`
    display: flex;
    overflow: hidden;
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
    overflow: hidden;
    height: 400px;
    z-index: 4;
    flex-direction: column;
    border-radius: 8px;
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
    room: string
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
    const [editing, setEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
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
            setLoading(true)
            const term = localStorage.getItem('term')
            const year = Number(localStorage.getItem('year'))
            console.log()
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response = await axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_URL}/login`,
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
                            process.env.REACT_APP_BACKEND_URL + '/schedules/' + year + '/' + term + '/generate',
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
    const handleEditClick = () => {
        setEditing(true)
    }
    const handleSaveClick = async () => {
        setEditing(false)
        const editedProfessorData: Record<string, string[]> = {}
        const editedCoursesData: Record<string, string> = {}
        const editedLocationData = { ...locationCourses }
        const professorsTable = document.getElementById('professor-table')
        if (professorsTable) {
            const rows = Array.from(professorsTable.getElementsByTagName('tr'))
            rows.forEach((row, i) => {
                if (i === 0) return
                const cells = Array.from(row.getElementsByTagName('td'))
                cells[1].innerText.split(', ').forEach((course) => {
                    editedCoursesData[course] = cells[0].innerText
                })
                editedProfessorData[cells[0].innerText] = cells[1].innerText.split(', ')
                // cells.forEach((cell, j) => {
                //     if (j === 0) {
                //         editedProfessorData[cell.innerText] = professorCourses[cell.innerText]
                //     } else if (j === 1) {
                //         editedProfessorData[cells[0].innerText] = cell.innerText.split(', ')
                //     }
                // })
            })
        }
        const locationTable = document.getElementById('location-table')
        if (locationTable) {
            const rows = Array.from(locationTable.getElementsByTagName('tr'))
            rows.forEach((row, i) => {
                if (i === 0) return
                const cells = Array.from(row.getElementsByTagName('td'))
                cells.forEach((cell, j) => {
                    if (j === 0) {
                        editedLocationData[cell.innerText] = locationCourses[cell.innerText]
                    } else if (j === 1) {
                        editedLocationData[cells[0].innerText][i - 1].course = cell.innerText
                    } else if (j === 2) {
                        editedLocationData[cells[0].innerText][i - 1].sections[0].days = cell.innerText.split(', ')
                    } else if (j === 3) {
                        editedLocationData[cells[0].innerText][i - 1].sections[0].num_seats = cell.innerText
                    }
                })
            })
        }
        setProfessorCourses(editedProfessorData)
        setLocationCourses(editedLocationData)
        const finalData = {
            year: year,
            terms: [
                {
                    term: term,
                    courses: timetableData.map((course) => ({
                        ...course,
                        sections: course.sections.map((section) => ({
                            ...section,
                            professor: editedCoursesData[course.course],
                            building: Object.keys(editedLocationData).find((key) => editedLocationData[key].find((c) => c.course === course.course) !== undefined) || '',
                        })),
                    })),
                },
            ],
        }
        try {
            const term = localStorage.getItem('term')
            const year = Number(localStorage.getItem('year'))
            localStorage.setItem('dat', JSON.stringify(finalData))
            const response = await axios.put(process.env.REACT_APP_BACKEND_URL + '/schedules/' + year + '/' + term, finalData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'text/plain',
                },
            })

            if (response.status === 200) {
                handleShow()
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const approveSchedule = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log('Schedule approved!')
        console.log(localStorage.getItem('dat'))
        const term = localStorage.getItem('term')
        const year = Number(localStorage.getItem('year'))
        const url = process.env.REACT_APP_BACKEND_URL + '/schedules/prev'
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ term: term, year: year }),
        }).then((response) => {
            setIsApproved(true)
            console.log('Schedule Sent')
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
            <div className='butto'>
                <button className='btn btn-dark ed' onClick={handleEditClick} disabled={editing}>
                    Edit
                </button>
                <button className='btn btn-success sa' onClick={handleSaveClick} disabled={!editing}>
                    Save
                </button>
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

            <form onSubmit={approveSchedule}>
                <ApproveContainer>
                    <SmallBlackButton onClick={() => setIsApproved(true)}>
                        <H7>APPROVE SCHEDULE</H7>
                    </SmallBlackButton>
                </ApproveContainer>
            </form>

            <div className='bottom-content'>
                {activeLink === 'courses' && (
                    <div>
                        <table className='table' id='courses-table'>
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
                                            <td contentEditable={editing}>{course.course}</td>
                                            <td contentEditable={editing}>{section.num}</td>
                                            <td contentEditable={editing}>{section.professor}</td>
                                            <td contentEditable={editing}>{section.days.join(', ')}</td>
                                            <td contentEditable={editing}>{section.start_time}</td>
                                            <td contentEditable={editing}>{section.end_time}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeLink === 'professors' && (
                    <div>
                        <table className='table' id='professor-table'>
                            <thead>
                                <tr>
                                    <th>Professor</th>
                                    <th>Courses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(professorCourses).map(([professor, courses]) => (
                                    <tr key={professor}>
                                        <td contentEditable={editing}>{professor}</td>
                                        <td contentEditable={editing}>{courses.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeLink === 'location' && (
                    <div>
                        <table className='table' id='location-table'>
                            <thead>
                                <tr>
                                    <th>Building</th>
                                    <th>Room</th>
                                    <th>Course</th>
                                    <th>Days</th>
                                    <th>Num Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(locationCourses).map(([building, courses]) =>
                                    courses.map((course, index) => (
                                        <tr key={`${building}-${index}`}>
                                            {index === 0 && (
                                                <td rowSpan={courses.length} contentEditable={editing}>
                                                    {building}
                                                </td>
                                            )}
                                            <td contentEditable={editing}>{course.sections[0].room}</td>
                                            <td contentEditable={editing}>{course.course}</td>
                                            <td contentEditable={editing}>{course.sections[0].days.join(', ')}</td>
                                            <td contentEditable={editing}>{course.sections[0].num_seats}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Timetable Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>Timetable has been updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
