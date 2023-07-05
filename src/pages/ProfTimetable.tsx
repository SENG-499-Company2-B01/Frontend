import { MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted } from '../components/atoms/navLink'
import { NavBarAdmin } from '../components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './proftimetable.css'

// Page to display created components
interface Schedule {
    [day: string]: {
        [hour: string]: string
    }
}
export const ProfTimetable = () => {
    const schedule: Schedule = {
        Monday: {
            '7': 'CSC 100',
            '8': 'CSC 100',
        },
        Tuesday: {
            '2': 'CSC 230',
            '11': 'SENG 265',
        },
        Wednesday: {
            '2': 'CSC 230',
            '11': 'SENG 265',
        },
        Thursday: {
            '7': 'CSC 100',
            '8': 'CSC 100',
        },
        Friday: {
            '2': 'CSC 230',
            '11': 'SENG 265',
        },
    }
    return (
        <div>
            <NavBarAdmin />
            <div className='prof'>
                <H2>Professor Timetable</H2>
            </div>
            <div className='tab'>
                <table className='table table-striped-columns'>
                    <thead>
                        <tr>
                            <th className='col'></th>
                            <th className='col'>
                                <H1>Monday</H1>
                            </th>
                            <th className='col'>
                                <H1>Tuesday</H1>
                            </th>
                            <th className='col'>
                                <H1>Wednesday</H1>
                            </th>
                            <th className='col'>
                                <H1>Thursday</H1>
                            </th>
                            <th className='col'>
                                <H1>Friday</H1>
                            </th>
                            <th className='col'>
                                <H1>Saturday</H1>
                            </th>
                            <th className='col'>
                                <H1>Sunday</H1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((hour) => (
                            <tr key={hour}>
                                <th className='row1 times'>{`${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} to ${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`}</th>
                                <td>
                                    <div className='co'>{schedule.Monday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Tuesday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Wednesday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Thursday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Friday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Saturday?.[hour.toString()] || ''}</div>
                                </td>
                                <td>
                                    <div className='co'>{schedule.Sunday?.[hour.toString()] || ''}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
