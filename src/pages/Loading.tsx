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
    return <div>{loading ? <Preloader /> : <ProfHomepage />}</div>
}
