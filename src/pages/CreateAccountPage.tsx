import { H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import { Button, Form, Input, InputNumber } from 'antd'

import { Navigate } from 'react-router-dom'
import React, { SyntheticEvent, useState } from 'react'

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

export const CreateAccountPage: React.FC = () => {
    const [form] = Form.useForm()

    const [navigate, setNavigate] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState(0)
    const [fieldOfExpertise, setFieldOfExpertise] = useState('')
    const [highestEducationObtained, setHighestEducationObtained] = useState('')
    const [password, setPassWord] = useState('')

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const url = 'https://company2-backend.onrender.com/users'

        const body = { username: username, email: email, firstname: firstName, lastname: lastName, password: password }

        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                return response
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem('status', 'user')
            })
        console.log(body)
        console.log(localStorage)
        setNavigate(true)
    }

    if (navigate) {
        return <Navigate to='/user' />
    }

    const onChangeYearsOfExperience = (value: number | null) => {
        setYearsOfExperience(value!)
    }

    return (
        <div className='row'>
            <NavBarAdmin />
            <div className='background'>
                <div style={{ textAlign: 'center' }}>
                    <H2>Create Account</H2>
                    <Form form={form} name='createAccount' layout='vertical' autoComplete='off' onFinish={onFinish} style={{ maxWidth: 600, margin: 'auto' }} scrollToFirstError>
                        <Form.Item name='username' label='Username' tooltip='Input username.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input username!' }]}>
                            <Input value={username} onChange={(e: any) => setUsername(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='email' label='Email' tooltip='Input email.' style={{ marginBottom: 20 }} rules={[{ type: 'email', required: true, message: 'Please input email!' }]}>
                            <Input value={email} onChange={(e: any) => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='firstName' label='First Name' tooltip='Input first name.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input first name!' }]}>
                            <Input value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='lastName' label='Last Name' tooltip='Input last name.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input last name!' }]}>
                            <Input value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='fieldOfExpertise' label='Field of Expertise' tooltip='Input field of expertise.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input field of expertise!' }]}>
                            <Input value={fieldOfExpertise} onChange={(e: any) => setFieldOfExpertise(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='yearsOfExperience' label='Years of Experience' tooltip='Input years of experience.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input years of experience!' }]}>
                            <InputNumber min={0} max={50} style={{ width: '100%' }} onChange={onChangeYearsOfExperience} />
                        </Form.Item>

                        <Form.Item name='highestEducationObtained' label='Highest Education Obtained' tooltip='Input highest education obtained.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input highest education obtained!' }]}>
                            <Input value={highestEducationObtained} onChange={(e: any) => setHighestEducationObtained(e.target.value)} />
                        </Form.Item>

                        <Form.Item name='password' label='Password' tooltip='Input password.' style={{ marginBottom: 20 }} hasFeedback rules={[{ required: true, message: 'Please input password!' }]}>
                            <Input.Password value={password} onChange={(e: any) => setPassWord(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name='confirmedPassword'
                            label='Confirmed Password'
                            dependencies={['password']}
                            hasFeedback
                            tooltip='Input confirmed password.'
                            style={{ marginBottom: 20 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input confirmed password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('The password does not match!'))
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                                <Button type='primary' htmlType='reset' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                    CLEAR
                                </Button>
                            </div>
                            <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                                <Button type='primary' htmlType='button' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                    CANCEL
                                </Button>
                                <Button type='primary' htmlType='submit' style={{ marginLeft: 200, backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }} onClick={submit}>
                                    CREATE
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
