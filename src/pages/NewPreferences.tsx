import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { useEffect } from 'react'
import './test.css'
import ProfTable from './ProfTable'
import axios from 'axios'

export const NewPreferences: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response = await axios
                    .post(
                        'http://localhost:8000/login',
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
                    .then(async (response) => {
                        const token = response.data.jwt
                        localStorage.setItem('jwt', token)
                        console.log(localStorage.getItem('jwt'))
                        const response_1 = await axios.get('http://localhost:8000/users', {
                            headers: {
                                // Accept: 'application/json',
                                'Content-Type': 'text/plain',
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        const data = response_1.data
                        localStorage.setItem('dat', JSON.stringify(data))
                    })
            } catch (error) {
                console.error('Error:', error)
            }
        }
        fetchData()
    }, [])
    const storedData = localStorage.getItem('dat')
    const parsedData = storedData ? JSON.parse(storedData) : []
    return (
        <div>
            <NavBarAdmin />
            <div className='con d-flex flex-row justify-content-between'>
                <h1 className='hea_1'>Professors</h1>
            </div>
            <ProfTable list={parsedData} />
        </div>
    )
}
