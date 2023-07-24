export interface IProfessor {
    username: string
    email: string
    available: object
    max_courses: number
    prev_approved: boolean
}

export const dummyList: IProfessor[] = [
    {
        username: 'Bill Bird',
        email: 'bill@bord.com',
        available: { F: ['', ''], M: ['', ''], R: ['', ''], T: ['', ''], W: ['', ''] },
        max_courses: 0,
        prev_approved: false,
    },
]
