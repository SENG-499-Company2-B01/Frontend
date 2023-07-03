import React, { useState, useEffect } from 'react'
import { Home } from './Home'
import Preloader from '../components/Loading/PreLoader'
import { ProfHomepage } from './ProfHomepage'
import { AdminHomepage } from './AdminHomepage'

export function Loading() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    const user = localStorage.getItem('user')
    if (user == 'admin') {
        return <div>{<AdminHomepage />}</div>
    } else {
        return <div>{<ProfHomepage />}</div>
    }
}
