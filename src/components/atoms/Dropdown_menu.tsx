import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

export const DropdownContainer = styled.div`
    display: inline-block;
`

export const Label = styled.label`
    margin-right: 8px;
`

export const ProfileButton = styled.button`
    color: black;
    line-height: 2;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    font-family: Montserrat-Medium;
    font-size: 14px;
    letter-spacing: 0.015em;
    background-color: transparent;
    border: none;
    &:hover {
        border-bottom: 2px solid #6885ce;
        color: #6885ce;
    }
`

export const DropdownMenu = styled.div`
    position: absolute;
    width: 236px;
    height: 198px;
    left: 84%;
    top: 85%;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 1px solid #ccc;
`

export const DropdownMenuItem = styled.button`
    display: block;
    width: 100%;
    padding: 8px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-family: Montserrat-Medium;
    font-size: 20px;
    letter-spacing: 0.015em;

    &:hover {
        background-color: #ddd;
    }
`

interface ProfileDropdownProps {
    name: string | null
    onPreferencesPage?: boolean
    onPreferencesPageCallback?: (callback: () => void) => Promise<void>
}

export const ProfileDropdown = (props: ProfileDropdownProps) => {
    const navigate = useNavigate()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false)
    const [secondConfirmationOpen, setSecondConfirmationOpen] = useState(false)
    const dropdownRef = useRef<HTMLInputElement>(null)
    const { name } = props

    useEffect(() => {
        const handleOutsideClick = (event: { target: any }) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isDropdownOpen])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleConfirmLogout = () => {
        setConfirmLogoutOpen(false)
        if (props.onPreferencesPage) {
            setSecondConfirmationOpen(true)
        } else {
            logout()
        }
    }

    const handleSecondConfirmation = () => {
        setSecondConfirmationOpen(false)
        if (props.onPreferencesPageCallback) props.onPreferencesPageCallback(logout)
    }

    const logout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
        localStorage.removeItem('user')
        localStorage.removeItem('status')
        navigate('/logout')
    }

    return (
        <DropdownContainer>
            <Modal title='Confirm Logout' open={confirmLogoutOpen} onOk={handleConfirmLogout} onCancel={() => setConfirmLogoutOpen(false)} okText='Logout'>
                <p>Are you sure you want to logout?</p>
            </Modal>
            <Modal title='Save Preferences' open={secondConfirmationOpen} onOk={handleSecondConfirmation} onCancel={() => setSecondConfirmationOpen(false)} cancelText='Logout' okText='Save and Logout'>
                <p>Would you like to save your in progress preferences?</p>
            </Modal>
            <ProfileButton onClick={toggleDropdown}>{name}</ProfileButton>
            {isDropdownOpen && (
                <DropdownMenu ref={dropdownRef}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                    <DropdownMenuItem>Account settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setConfirmLogoutOpen(true)}>Sign out</DropdownMenuItem>
                </DropdownMenu>
            )}
        </DropdownContainer>
    )
}

export default ProfileDropdown
