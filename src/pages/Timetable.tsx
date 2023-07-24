import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { useEffect, useState, useRef } from 'react'
import './time.css'
import ProfTable from './ProfTable'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'
import { H1, H2 } from '../components/atoms/typography'
import { Button, Modal } from 'react-bootstrap'

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
    const [term, setTerm] = useState('')
    const [year, setYear] = useState('')
    const [professorCourses, setProfessorCourses] = useState<Record<string, string[]>>({})
    const [locationCourses, setLocationCourses] = useState<Record<string, Course[]>>({})
    const [activeLink, setActiveLink] = useState('courses')
    const [editing, setEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
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
                            'http://localhost:8000/schedules/2023/' + term + '/generate',
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
        const editedProfessorData = { ...professorCourses }
        const editedLocationData = { ...locationCourses }
        const professorsTable = document.querySelector('.professors-table')
        if (professorsTable) {
            const rows = Array.from(professorsTable.getElementsByTagName('tr'))
            rows.forEach((row, i) => {
                if (i === 0) return
                const cells = Array.from(row.getElementsByTagName('td'))
                cells.forEach((cell, j) => {
                    if (j === 0) {
                        editedProfessorData[cell.innerText] = professorCourses[cell.innerText]
                    } else if (j === 1) {
                        editedProfessorData[cells[0].innerText] = cell.innerText.split(', ')
                    }
                })
            })
        }
        const locationTable = document.querySelector('.location-table')
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
                            professor: editedProfessorData[section.professor],
                            building: Object.keys(editedLocationData).find((key) => editedLocationData[key].find((c) => c.course === course.course) !== undefined) || '',
                        })),
                    })),
                },
            ],
        }
        try {
            const response = await axios.put('http://localhost:8000/schedules/2023/fall', finalData, {
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
    return (
        <div>
            <NavBarAdmin />
            {loading ? <PreLoader /> : ''}
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
                                            {index === 0 && (
                                                <td rowSpan={courses.length} contentEditable={editing}>
                                                    {building}
                                                </td>
                                            )}
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
