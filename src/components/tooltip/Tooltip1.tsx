import React, { useState } from 'react'
import './Tooltip1.css'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
    position?: TooltipPosition
}

const Tooltip: React.FC<TooltipProps> = ({ position = 'top' }) => {
    const [isTooltipOpen, setTooltipOpen] = useState(false)

    const toggleTooltip = () => {
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
            {isTooltipOpen && <div className={getTooltipContentClassName()}>This is the tooltip content.</div>}
        </div>
    )
}

export default Tooltip
