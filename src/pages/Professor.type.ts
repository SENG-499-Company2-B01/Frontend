export interface IProfessor {
    username: string
    email: string
    available: object
    max_courses: number
}

export const dummyList: IProfessor[] = [
    {
        username: 'Bill Bird',
        email: 'bill@bord.com',
        available: { F: ['', ''], M: ['', ''], R: ['', ''], T: ['', ''], W: ['', ''] },
        max_courses: 0
    },
]
