import { BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { goToTop, NavBarProf } from '../components/navbar'
import { useEffect, useState } from 'react'
import { SimpleLink } from '../components/atoms/navLink'
import { ProfessorHowTo } from './HowTo'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'
import './proftimetable.css'
import './profst.css'

const convertTime12to24 = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ')

    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(':')

    if (hours === '12') {
        hours = '00'
    }

    if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12)
    }

    return `${hours}:${minutes}`
}

const times = ['7:00AM-8:00AM', '8:00AM-9:00AM', '9:00AM-10:00AM', '10:00AM-11:00AM', '11:00AM-12:00PM', '12:00PM-1:00PM', '1:00PM-2:00PM', '2:00PM-3:00PM', '3:00PM-4:00PM', '4:00PM-5:00PM']
interface Schedule {
    [key: string]: {
        [key: string]: string
    }
}

const emptySchedule: Schedule = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
}

for (let hour = 7; hour <= 15; hour++) {
    emptySchedule.Monday[hour.toString()] = ''
    emptySchedule.Tuesday[hour.toString()] = ''
    emptySchedule.Wednesday[hour.toString()] = ''
    emptySchedule.Thursday[hour.toString()] = ''
    emptySchedule.Friday[hour.toString()] = ''
    emptySchedule.Saturday[hour.toString()] = ''
    emptySchedule.Sunday[hour.toString()] = ''
}

const days = ['M', 'T', 'W', 'R', 'F']
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
export const Profsched = () => {
    const [loading, setLoading] = useState<boolean>(false)
    // const [professor, setProfessor] = useState('Issa Traore')
    const [courses, setCourses] = useState<Course[]>([])
    const [schedule, setSchedule] = useState(emptySchedule)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.post(
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

                const token = response.data.jwt
                localStorage.setItem('jwt', token)
                const term = localStorage.getItem('term')
                const year = Number(localStorage.getItem('year'))
                console.log(year)
                console.log(term)
                const response2 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/schedules/prev`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'text/plain',
                    },
                })
                const data = response2.data
                localStorage.setItem('dat', JSON.stringify(data))
                const parsedData_old = JSON.parse(localStorage.getItem('dat') || '[]')
                const professorSchedule: Schedule = { ...emptySchedule }
                const parsedData = parsedData_old[parsedData_old.length - 1]
                console.log(parsedData)
                parsedData.terms[0].courses.forEach((course: Course) => {
                    course.sections.forEach((section: Section) => {
                        if (section.professor === localStorage.getItem('username')?.replace('.', ' ')) {
                            console.log('HERE')
                            const startHour = parseInt(convertTime12to24(section.start_time).split(':')[0])
                            const endHour = parseInt(convertTime12to24(section.end_time).split(':')[0])

                            section.days.forEach((day) => {
                                const dayMap: { [key: string]: string } = {
                                    M: 'Monday',
                                    T: 'Tuesday',
                                    W: 'Wednesday',
                                    R: 'Thursday',
                                    F: 'Friday',
                                }
                                const dayCapitalized = dayMap[day]
                                for (let hour = startHour; hour < endHour; hour++) {
                                    if (!professorSchedule[dayCapitalized]) {
                                        professorSchedule[dayCapitalized] = {}
                                    }

                                    professorSchedule[dayCapitalized][hour.toString()] = course.course
                                }
                            })
                        }
                    })
                })

                setCourses(parsedData.terms[0].courses)
                setSchedule(professorSchedule)
                console.log(professorSchedule)
                setLoading(false)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            {loading ? (
                <div className='df'>
                    <h1>Loading Your approved Schedule...</h1>
                </div>
            ) : (
                <div>
                    <div className='Headi'>
                        <div>
                            <h2>
                                {`Term: ${localStorage.getItem('term') ?? ''}`}
                                <br />
                                {`Year: ${localStorage.getItem('year') || '2023'}`}
                            </h2>
                        </div>
                    </div>
                    <div className='tab'>
                        <table className='table table-striped-columns'>
                            <thead>
                                <tr>
                                    <th className='col'></th>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                        <th className='col' key={day}>
                                            <H1>{day}</H1>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((hour) => (
                                    <tr key={hour}>
                                        <th className='row2 times'>{`${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} to ${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`}</th>
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                            <td key={day}>
                                                <div className='co'>{schedule[day]?.[hour.toString()] || ''}</div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
