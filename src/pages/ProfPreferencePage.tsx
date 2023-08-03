import { H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'

import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Radio, Space, TimePicker } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'
import React, { SyntheticEvent, useState, useEffect } from 'react'
import type { Dayjs } from 'dayjs'
import { RangeValue } from 'rc-picker/lib/interface'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
}

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

export const ProfPreferencePage: React.FC = () => {
    const { RangePicker } = TimePicker

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const initialValue = [{ name: 'Once/Week', value: 'Once/Week' }]

    const [formDisabled, setFormDisabled] = useState<boolean>(false)
    const [semester, setSemester] = useState('Fall')
    const [ableToTeach, setAbleToTeach] = useState((!formDisabled).toString())
    const [reason, setReason] = useState('')
    const [preferredTime, setPreferredTime] = useState(['', ''])
    const [numberOfClasses, setNumberOfClasses] = useState(0)
    const [classFormat, setClassFormat] = useState(initialValue)
    const [navigate, setNavigate] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        submitForm()
    }

    const submitForm = async (fromCallback?: boolean) => {
        const username = localStorage.getItem('username')

        const url = process.env.REACT_APP_BACKEND_URL + '/users/' + username

        const time = { F: [preferredTime], M: [preferredTime], R: [preferredTime], T: [preferredTime], W: [preferredTime] }

        const body = { max_courses: numberOfClasses, available: time }

        await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
        console.log(numberOfClasses)
        console.log(localStorage)
        if (!fromCallback) setNavigate(true)
    }

    if (navigate) {
        return <Navigate to='/user' />
    }

    const onAbleToTeach = (checked: boolean, value: string) => {
        setFormDisabled(!checked)
        setAbleToTeach(value)
        setReason('')
    }

    const onDisableToTeach = (checked: boolean, value: string) => {
        setFormDisabled(checked)
        setAbleToTeach(value)
    }

    const onSelectTime = (values: RangeValue<Dayjs>, formatString: [string, string]) => {
        setPreferredTime(formatString)
    }

    const onSelectNewTime = (values: RangeValue<Dayjs>, formatString: [string, string]) => {
        console.log(formatString)
        // preferredTime.push({ id: 0, value: formatString })
    }

    const onDeleteTime = (values: RangeValue<Dayjs>, formatString: [string, string]) => {
        // setPreferredTime(preferredTime.filter((item) => item.id !== Number(formatString.replace(':', ''))))
    }

    const selectClassFormat = (e: CheckboxChangeEvent) => {
        {
            if (e.target.checked === false) {
                setClassFormat(classFormat.filter((item) => item.value !== e.target.name))
                // console.log('remove', e.target.name, classFormat)
            } else {
                classFormat.push({ name: e.target.name!, value: e.target.name! })
                // console.log('add', e.target.name, classFormat)
            }
        }
    }

    const onChangeNumberOfClasses = (value: number | null) => {
        setNumberOfClasses(value!)
    }

    const onLogoutButWantsToSave = async (callback: () => void) => {
        await submitForm(true)
        callback()
    }

    return (
        <div>
            <NavBarProf onPreferencesPage onPreferencePageCallback={onLogoutButWantsToSave} />
            <div className='cen'>
                <H2>Preference</H2>
                <Form {...formItemLayout} form={form} name='ableToTeachPreference' onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError>
                    <Form.Item name='Semester' label='Semester' tooltip='Select a semester.' style={{ marginBottom: 20 }}>
                        <Radio.Group defaultValue='Fall'>
                            <Radio.Button value='Fall' onChange={(e: any) => setSemester(e.target.value)}>
                                Fall
                            </Radio.Button>
                            <Radio.Button value='Winter' onChange={(e: any) => setSemester(e.target.value)}>
                                Winter
                            </Radio.Button>
                            <Radio.Button value='Summer' onChange={(e: any) => setSemester(e.target.value)}>
                                Summer
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name='Able To Teach' label='Able To Teach' tooltip='Are you able to teach this semester?' style={{ marginBottom: 20 }}>
                        <Radio.Group defaultValue='Yes' style={{ marginBottom: 10 }}>
                            <Radio value='Yes' checked={formDisabled} onChange={(e) => onAbleToTeach(e.target.checked, e.target.value)}>
                                Yes
                            </Radio>
                            <Radio value='No' checked={formDisabled} onChange={(e) => onDisableToTeach(e.target.checked, e.target.value)}>
                                No
                            </Radio>
                        </Radio.Group>
                        <Form.Item name='reason' rules={[{ required: formDisabled, message: 'Please input reason!' }]}>
                            <Input.TextArea showCount disabled={!formDisabled} maxLength={100} value={reason} placeholder='Reason' onChange={(e: any) => setReason(e.target.value)} />
                        </Form.Item>
                    </Form.Item>

                    <Form {...formItemLayout} form={form} name='preference' onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError disabled={formDisabled}>
                        <Form.Item name='Preferred Time' label='Preferred Time' tooltip='Input preferred time.' style={{ marginBottom: 20 }}>
                            <Space align='baseline' direction='vertical' size={12} style={{ marginBottom: 10 }}>
                                <RangePicker format='HH:mm' onChange={onSelectTime} />
                            </Space>
                            {/* <Form.List name='Added Preferred Time'>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <Space key={field.key} align='baseline'>
                                                <Form.Item {...field} name={[field.name, 'start and end time']} style={{ marginBottom: 10 }}>
                                                    <Space align='baseline'>
                                                        <RangePicker format='HH:mm' onChange={onSelectNewTime} />
                                                    </Space>
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        remove(field.name)
                                                        onDeleteTime
                                                    }}
                                                />
                                            </Space>
                                        ))}
                                        <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '260px' }}>
                                            Add
                                        </Button>
                                    </>
                                )}
                            </Form.List> */}
                        </Form.Item>

                        <Form.Item name='numberOfClasses' label='Number of Classes' tooltip='Input number of classes.' style={{ marginBottom: 20 }}>
                            <InputNumber min={0} max={999} defaultValue={0} onChange={onChangeNumberOfClasses} />
                        </Form.Item>

                        <Form.Item name='Class Format' label='Class Format' tooltip='Select one or more preferred class formats' style={{ marginBottom: 20 }}>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Checkbox defaultChecked={true} name='Once/Week' style={{ marginBottom: 5 }} onChange={selectClassFormat}>
                                        Once/Week
                                    </Checkbox>
                                    <Checkbox name='M, R' style={{ marginBottom: 5 }} onChange={selectClassFormat}>
                                        M, R
                                    </Checkbox>
                                    <Checkbox name='T, W, F' style={{ marginBottom: 5 }} onChange={selectClassFormat}>
                                        T, W, F
                                    </Checkbox>
                                    <Checkbox name='Online' style={{ marginBottom: 5 }} onChange={selectClassFormat}>
                                        Online
                                    </Checkbox>
                                    <Input placeholder='Other' />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>

                    <Form.Item {...tailFormItemLayout}>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='reset' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }} onClick={() => setFormDisabled(false)}>
                                CLEAR
                            </Button>
                        </div>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='button' style={{ marginRight: 200, backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                CANCEL
                            </Button>
                            <Button type='primary' htmlType='submit' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }} onClick={submit}>
                                SUBMIT
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
