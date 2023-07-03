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
    const status = localStorage.getItem('status')
    if (status == 'home' && user == 'admin') {
        return <div>{<AdminHomepage />}</div>
    }
    if (status == 'home' && user == 'prof') {
        return <div>{<ProfHomepage />}</div>
    }
    if (status == 'login' && user == 'admin') {
        localStorage.setItem('status', 'home')
        return <div>{loading ? <Preloader /> : <AdminHomepage />}</div>
    } else {
        localStorage.setItem('status', 'home')
        return <div>{loading ? <Preloader /> : <ProfHomepage />}</div>
    }
}
