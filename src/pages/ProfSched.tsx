import { H1 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
    const [schedule, setSchedule] = useState(emptySchedule)
    const [data, setData] = useState([] as any[])
    const [year, setYear] = useState(2023)
    const [semester, setSemester] = useState('fall')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/schedules/prev`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        })
        const responseData = response.data
        console.log(responseData)
        setData(responseData)
        setLoading(false)
    }

    useEffect(() => {
        parseSchedule()
    }, [data, year, semester])

    const parseSchedule = () => {
        const scheduleYear = data.find((sched: any) => sched.year === year)
        const scheduleTerm = scheduleYear.terms.find((term: any) => term.term === semester)

        const professorSchedule: Schedule = { ...emptySchedule }
        scheduleTerm.courses.forEach((course: Course) => {
            course.sections.forEach((section: Section) => {
                if (section.professor === localStorage.getItem('username')?.replace('.', ' ')) {
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

        setSchedule(professorSchedule)
        console.log(professorSchedule)
    }

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
