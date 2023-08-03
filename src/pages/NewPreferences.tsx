import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import React, { useEffect, useState } from 'react'
import './test.css'
import ProfTable from './ProfTable'
import axios from 'axios'
import PreLoader from '../components/Loading/PreLoader'
import { H2 } from '../components/atoms/typography'

export const NewPreferences: React.FC = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const response_1 = await axios.get(process.env.REACT_APP_BACKEND_URL + '/users', {
                    headers: {
                        // Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                })
                const data = response_1.data
                localStorage.setItem('dat', JSON.stringify(data))
                setLoading(false)
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
            <div className='tab'>
                <h1 className='hea_1'>
                    <H2>Professors</H2>
                </h1>
            </div>
            {loading ? <PreLoader /> : ''}
            <ProfTable list={parsedData} />
        </div>
    )
}
