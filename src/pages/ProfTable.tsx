import { IProfessor } from './Professor.type'
import React, { useState, useEffect, useRef } from 'react'
import './table.css'
import { Modal, Button } from 'react-bootstrap'
import { Checkbox } from '../components/atoms/checkbox'

type Props = {
    list: IProfessor[]
}

const ProfTable = (props: Props) => {
    const { list } = props
    const isChecked = useRef(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProfessors, setFilteredProfessors] = useState(list)
    const [showModal, setShowModal] = useState(false)
    const [selectedProfessor, setSelectedProfessor] = useState<IProfessor | null>(null)

    useEffect(() => {
        setFilteredProfessors(list)
    }, [list])

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        filterProfessors(event.target.value)
    }
    const filterProfessors = (query: string) => {
        const filtered = list.filter((prof) => prof.username.toLowerCase().includes(query.toLowerCase()))
        setFilteredProfessors(filtered)
    }
    const handleShowModal = (prof: IProfessor) => {
        setSelectedProfessor(prof)
        setShowModal(true)
    }

    // Function to handle modal hide
    const handleCloseModal = () => {
        setSelectedProfessor(null)
        setShowModal(false)
    }
    const renderProfessors = () => {
        if (Array.isArray(filteredProfessors)) {
            return filteredProfessors.map((prof, index) => {
                return (
                    <tr key={prof.username} onClick={() => handleShowModal(prof)}>
                        <th scope='row'>{index + 1}</th>
                        <td>{`${prof.username}`}</td>
                        <td>{`${prof.email}`}</td>
                        {findAvailable(prof.available).map((value, index) => {
                            return <td key={index}>{value}</td>
                        })}
                        <td>{`${prof.max_courses}`}</td>
                    </tr>
                )
            })
        } else {
            return null
        }
    }

    const findAvailable = (available: object) => {
        const time = ['']
        if (available != null) {
            const weekdays = Object.keys(available)
            for (let i = 0; i < weekdays.length; i++) {
                time[i] = weekdays[i] + ': ' + available[weekdays[i] as keyof typeof available]
            }
        }
        return time
    }

    const styleObj = {
        paddingLeft: '115px',
    }

    return (
        <div className='tab'>
            <div className='tab'>
                <nav className='navbar navbar-light se justify-content-end'>
                    <form className='form-inline'>
                        <input className='form-control mr-sm-2 gh' type='search' placeholder='Search' aria-label='Search' value={searchQuery} onChange={handleSearchQueryChange} />
                    </form>
                </nav>
            </div>
            <div className='tab'>
                <table className='table table-hover blue-table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Professor Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Preferred Time</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                            <th scope='col'>Max Courses</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>{renderProfessors()}</tbody>
                </table>
            </div>
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Professor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProfessor && (
                        <>
                            <p>Username: {selectedProfessor.username}</p>
                            <p>Email: {selectedProfessor.email}</p>
                            {findAvailable(selectedProfessor.available).map((value, index) => {
                                if (index == 0) {
                                    return <p key={index}>Preferred Time: {value}</p>
                                }
                                return (
                                    <p key={index} style={styleObj}>
                                        {value}
                                    </p>
                                )
                            })}
                            <p>Max Courses: {selectedProfessor.max_courses || 'Not assigned yet'}</p>
                            {/* Add more professor details here */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Checkbox label={'Approve Preferences?'} onClick={(value: boolean) => (isChecked.current = value)} />
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfTable
