import React, { useState, useEffect } from 'react'
import Main from './pages/Main'
import Preloader from './components/Loading/PreLoader'

function App() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <div>
            <Main />
        </div>
    )
}

export default App
