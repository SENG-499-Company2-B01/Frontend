import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { useEffect, useState } from 'react'
import './test.css'
import ProfTable from './ProfTable'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'

export const NewPreferences: React.FC = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response = await axios
                    .post(
                        process.env.REACT_APP_BACKEND_URL + '/login',
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
                        const response_1 = await axios.get(process.env.REACT_APP_BACKEND_URL + '/users', {
                            headers: {
                                // Accept: 'application/json',
                                'Content-Type': 'text/plain',
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        const data = response_1.data
                        localStorage.setItem('dat', JSON.stringify(data))
                        setLoading(false)
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
            {loading ? <PreLoader /> : ''}
            <ProfTable list={parsedData} />
        </div>
    )
}
