import moment from 'moment'
import Calendar from './Calendar'

export default function BasicCalendar() {
    const events = [
        {
            start: moment('2023-07-03T13:00:00').toDate(),
            end: moment('2023-07-03T14:30:00').toDate(),
            title: 'ENGR 110',
        },
        {
            start: moment('2023-07-03T14:30:00').toDate(),
            end: moment('2023-07-03T15:30:00').toDate(),
            title: 'CSC 360',
        },
        {
            start: moment('2023-07-03T10:00:00').toDate(),
            end: moment('2023-07-03T11:30:00').toDate(),
            title: 'CSC 230',
        },
        {
            start: moment('2023-07-03T15:30:00').toDate(),
            end: moment('2023-07-03T16:30:00').toDate(),
            title: 'CSC 115',
        },
        {
            start: moment('2023-07-03T15:30:00').toDate(),
            end: moment('2023-07-03T16:30:00').toDate(),
            title: 'MATH 101',
        },
        {
            start: moment('2023-07-03T11:30:00').toDate(),
            end: moment('2023-07-03T13:00:00').toDate(),
            title: 'PHYS 110',
        },
        {
            start: moment('2023-07-03T08:30:00').toDate(),
            end: moment('2023-07-03T10:00:00').toDate(),
            title: 'MATH 110',
        },
        {
            start: moment('2023-07-04T09:30:00').toDate(),
            end: moment('2023-07-04T10:30:00').toDate(),
            title: 'MATH 100',
        },
        {
            start: moment('2023-07-04T16:30:00').toDate(),
            end: moment('2023-07-04T18:00:00').toDate(),
            title: 'CSC 350',
        },
        {
            start: moment('2023-07-04T14:30:00').toDate(),
            end: moment('2023-07-04T16:30:00').toDate(),
            title: 'ECE 355',
        },
        {
            start: moment('2023-07-04T13:30:00').toDate(),
            end: moment('2023-07-04T14:30:00').toDate(),
            title: 'MATH 109',
        },
        {
            start: moment('2023-07-04T08:30:00').toDate(),
            end: moment('2023-07-04T09:30:00').toDate(),
            title: 'CSC 111',
        },
        {
            start: moment('2023-07-04T13:30:00').toDate(),
            end: moment('2023-07-04T14:30:00').toDate(),
            title: 'ENGR 130',
        },
        {
            start: moment('2023-07-05T14:30:00').toDate(),
            end: moment('2023-07-05T15:30:00').toDate(),
            title: 'CSC 360',
        },
        {
            start: moment('2023-07-05T15:30:00').toDate(),
            end: moment('2023-07-05T16:30:00').toDate(),
            title: 'CSC 115',
        },
        {
            start: moment('2023-07-05T13:30:00').toDate(),
            end: moment('2023-07-05T14:30:00').toDate(),
            title: 'MATH 109',
        },
        {
            start: moment('2023-07-05T09:30:00').toDate(),
            end: moment('2023-07-05T10:30:00').toDate(),
            title: 'MATH 100',
        },
        {
            start: moment('2023-07-05T08:30:00').toDate(),
            end: moment('2023-07-05T09:30:00').toDate(),
            title: 'CSC 111',
        },
        {
            start: moment('2023-07-05T13:30:00').toDate(),
            end: moment('2023-07-05T14:30:00').toDate(),
            title: 'ENGR 130',
        },
        {
            start: moment('2023-07-05T15:30:00').toDate(),
            end: moment('2023-07-05T16:30:00').toDate(),
            title: 'MATH 101',
        },
        {
            start: moment('2023-07-06T15:30:00').toDate(),
            end: moment('2023-07-06T16:30:00').toDate(),
            title: 'CSC 115',
        },
        {
            start: moment('2023-07-06T11:30:00').toDate(),
            end: moment('2023-07-06T13:00:00').toDate(),
            title: 'PHYS 110',
        },
        {
            start: moment('2023-07-06T10:30:00').toDate(),
            end: moment('2023-07-06T11:50:00').toDate(),
            title: 'CSC 111',
        },
        {
            start: moment('2023-07-06T15:30:00').toDate(),
            end: moment('2023-07-06T16:30:00').toDate(),
            title: 'MATH 101',
        },
        {
            start: moment('2023-07-06T08:30:00').toDate(),
            end: moment('2023-07-06T10:00:00').toDate(),
            title: 'MATH 110',
        },
        {
            start: moment('2023-07-06T10:00:00').toDate(),
            end: moment('2023-07-06T11:30:00').toDate(),
            title: 'CSC 230',
        },
        {
            start: moment('2023-07-06T16:30:00').toDate(),
            end: moment('2023-07-06T18:00:00').toDate(),
            title: 'CSC 350',
        },
        {
            start: moment('2023-07-06T13:00:00').toDate(),
            end: moment('2023-07-06T14:30:00').toDate(),
            title: 'ENGR 110',
        },
        {
            start: moment('2023-07-07T09:30:00').toDate(),
            end: moment('2023-07-07T10:30:00').toDate(),
            title: 'MATH 100',
        },
        {
            start: moment('2023-07-06T14:30:00').toDate(),
            end: moment('2023-07-06T15:30:00').toDate(),
            title: 'CSC 360',
        },
        {
            start: moment('2023-07-07T10:30:00').toDate(),
            end: moment('2023-07-07T11:50:00').toDate(),
            title: 'CSC 111',
        },
        {
            start: moment('2023-07-07T14:30:00').toDate(),
            end: moment('2023-07-07T16:30:00').toDate(),
            title: 'ECE 355',
        },
        {
            start: moment('2023-07-07T13:30:00').toDate(),
            end: moment('2023-07-07T14:30:00').toDate(),
            title: 'ENGR 130',
        },
        {
            start: moment('2023-07-07T13:30:00').toDate(),
            end: moment('2023-07-07T14:30:00').toDate(),
            title: 'MATH 109',
        },
        {
            start: moment('2023-07-07T08:30:00').toDate(),
            end: moment('2023-07-07T09:30:00').toDate(),
            title: 'CSC 111',
        },
    ]
    return <Calendar events={events} min={moment('2023-07-06T08:00:00').toDate()} max={moment('2023-07-06T23:00:00').toDate()} />
}
