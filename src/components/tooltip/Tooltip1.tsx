import React, { useState, useEffect } from 'react'
import './Tooltip1.css'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
    position?: TooltipPosition
    message: string // This line defines a new prop for the tooltip message.
}

const Tooltip: React.FC<TooltipProps> = ({ position = 'top', message }) => {
    const [isTooltipOpen, setTooltipOpen] = useState(false)

    useEffect(() => {
        const closeTooltip = () => {
            setTooltipOpen(false)
        }

        document.addEventListener('click', closeTooltip)

        return () => {
            document.removeEventListener('click', closeTooltip)
        }
    }, [])

    const toggleTooltip = (e: React.MouseEvent) => {
        e.stopPropagation()
        setTooltipOpen(!isTooltipOpen)
    }

    const getTooltipContentClassName = () => {
        let className = 'tooltip-content'
        if (position === 'top') className += ' tooltip-top'
        else if (position === 'bottom') className += ' tooltip-bottom'
        else if (position === 'left') className += ' tooltip-left'
        else if (position === 'right') className += ' tooltip-right'
        return className
    }

    return (
        <div className='tooltip-container'>
            <div className={`tooltip-trigger ${isTooltipOpen ? 'active' : ''}`} onClick={toggleTooltip}>
                <span className='tooltip-icon'>?</span>
            </div>
            {isTooltipOpen && <div className={getTooltipContentClassName()}>{message}</div>}
        </div>
    )
}

export default Tooltip
