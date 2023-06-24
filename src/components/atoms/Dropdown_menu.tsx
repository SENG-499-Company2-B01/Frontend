import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { H7 } from './typography'
import { SimpleLink } from './navLink'

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
    left: 1535px;
    top: 91px;
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

export const ProfileDropdown = (props: { name: string }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

    return (
        <DropdownContainer>
            <ProfileButton onClick={toggleDropdown}>{name}</ProfileButton>
            {isDropdownOpen && (
                <DropdownMenu ref={dropdownRef}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                    <DropdownMenuItem>Account settings</DropdownMenuItem>
                    <DropdownMenuItem>
                        <SimpleLink to='/logout'>Sign out</SimpleLink>
                    </DropdownMenuItem>
                </DropdownMenu>
            )}
        </DropdownContainer>
    )
}

export default ProfileDropdown
