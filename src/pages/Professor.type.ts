export interface IProfessor {
    username: string
    email: string
    available: object
    max_courses: number
    course_pref: string[]
    prev_approved: boolean
}

export const dummyList: IProfessor[] = [
    {
        username: 'Bill Bird',
        email: 'bill@bord.com',
        available: { F: ['', ''], M: ['', ''], R: ['', ''], T: ['', ''], W: ['', ''] },
        max_courses: 0,
        course_pref: ['CSC111'],
        prev_approved: false,
    },
]
