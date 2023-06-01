import React, { useState, useEffect } from 'react'
import { Home } from './Home'
import Preloader from '../components/Loading/PreLoader'

export function Loading() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])
    return <div>{loading ? <Preloader /> : <Home />}</div>
}