import { H2, H3, H4, H5 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Profile/profile.css'
import { NavBarProf } from '../components/navbar'
import React, { useState, useEffect } from 'react'
import { IProfessor } from './Professor.type'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const ProfProfilePage: React.FC = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({} as IProfessor)

    useEffect(() => {
        fetchPreferences()
    }, [])

    const fetchPreferences = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/users/' + localStorage.getItem('username')
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setUser(data)
            })
    }

    const onBackButton = () => {
        navigate('/ProfHomepage')
    }

    return (
        <div>
            <NavBarProf />
            <div className='cen'>
                <H2>Profile</H2>
                <div className='item'>
                    <H3>Username: </H3>
                    <H4>{user.username}</H4>
                </div>
                <div className='item'>
                    <H3>Email: </H3>
                    <H4>{user.email}</H4>
                </div>
                <div className='item'>
                    <H3>Professional Engineer: </H3>
                    <H4>{user.peng ? 'Yes' : 'No'}</H4>
                </div>
                {user.available && (
                    <div className='item'>
                        <H3>Availability: </H3>
                        <H4>
                            M: {user.available.M && user.available.M.map((strlist) => strlist.join(' - ')).join(', ')}
                            <br />
                            T: {user.available.T && user.available.T.map((strlist) => strlist.join(' - ')).join(', ')}
                            <br />
                            W: {user.available.W && user.available.W.map((strlist) => strlist.join(' - ')).join(', ')}
                            <br />
                            R: {user.available.R && user.available.R.map((strlist) => strlist.join(' - ')).join(', ')}
                            <br />
                            F: {user.available.F && user.available.F.map((strlist) => strlist.join(' - ')).join(', ')}
                        </H4>
                    </div>
                )}
                <div className='item'>
                    <H3>Max Courses: </H3>
                    <H4>{user.max_courses}</H4>
                </div>
                {user.course_pref && (
                    <div className='item'>
                        <H3>Courses: </H3>
                        <H4>{user.course_pref.join(', ')}</H4>
                    </div>
                )}
                <Button type='default' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }} onClick={() => onBackButton()}>
                    BACK
                </Button>
            </div>
        </div>
    )
}
