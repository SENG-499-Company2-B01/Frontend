import React, { useState, useEffect } from 'react'
import Main from './pages/Main'
import Preloader from './components/Loading/PreLoader'

function App() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])
    return <div>{loading ? <Preloader /> : <Main />}</div>
}

export default App
