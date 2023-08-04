export interface IProfessor {
    username: string
    email: string
    peng: boolean
    available: available
    pref_approved: boolean
    max_courses: number
    course_pref: string[]
    prev_approved: boolean
}

export interface available {
    M: string[][]
    T: string[][]
    W: string[][]
    R: string[][]
    F: string[][]
}

export const dummyList: IProfessor[] = [
    {
        username: 'Bill Bird',
        email: 'bill@bord.com',
        peng: true,
        available: { F: [['', '']], M: [['', '']], R: [['', '']], T: [['', '']], W: [['', '']] },
        pref_approved: false,
        max_courses: 0,
        course_pref: ['CSC111'],
        prev_approved: false,
    },
]
