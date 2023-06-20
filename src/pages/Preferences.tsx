import { MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton, BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin, NavBarProf } from '../components/navbar'
import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { Table } from 'react-bootstrap'
import './test.css'

export const Preferences: React.FC = () => {
    return (
        <div>
            <NavBarAdmin />
            <div className='con d-flex flex-row justify-content-between'>
                <h1 className='hea_1'>Preferences</h1>
                <nav className='navbar navbar-light se'>
                    <form className='form-inline'>
                        <input className='form-control mr-sm-2 gg' type='search' placeholder='Search' aria-label='Search' />
                    </form>
                </nav>
            </div>

            <div className='tab'>
                <table className='table table-striped table-hover'>
                    <thead className='thead-dark '>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Professor Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Schedule/Approval</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        <tr>
                            <th scope='row'>1</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>2</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>3</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act2_b'>Leave</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>4</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>5</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>6</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>7</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <th scope='row'>8</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act2_b'>Leave</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>9</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <th scope='row'>10</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>11</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <th scope='row'>12</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act2_b'>Leave</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                        <tr>
                            <th scope='row'>13</th>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <button className='act_b'>Active</button>
                            </td>
                            <td>Approved</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
