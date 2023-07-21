import { IProfessor } from './Professor.type'
import React, { useState } from 'react'
import './table.css'
import { Modal, Button } from 'react-bootstrap'

type Props = {
    list: IProfessor[]
}

const ProfTable = (props: Props) => {
    const { list } = props
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProfessors, setFilteredProfessors] = useState(list)
    const [showModal, setShowModal] = useState(false)
    const [selectedProfessor, setSelectedProfessor] = useState<IProfessor | null>(null)
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
                    </tr>
                )
            })
        } else {
            return null
        }
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
                            <p>Preferences: {selectedProfessor.preferences || 'Not assigned yet'}</p>
                            {/* Add more professor details here */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfTable
