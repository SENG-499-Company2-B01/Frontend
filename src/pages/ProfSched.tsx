import { BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { goToTop, NavBarProf } from '../components/navbar'
import { useEffect, useState } from 'react'
import { SimpleLink } from '../components/atoms/navLink'
import { ProfessorHowTo } from './HowTo'

const url = 'http://localhost:8000/users'

export const Profsched = () => {
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
    }, [])

    return <div>{username ? <h1>Welcome, {username}</h1> : <h1>Please log in</h1>}</div>
}
