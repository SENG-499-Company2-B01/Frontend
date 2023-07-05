export interface IProfessor {
    username: string
    email: string
    preferences: string
}

export const dummyList: IProfessor[] = [
    {
        username: 'Bill Bird',
        email: 'bill@bord.com',
        preferences: 'blahhh',
    },
]
