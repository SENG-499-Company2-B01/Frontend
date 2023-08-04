import { H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'

import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Radio, Space, TimePicker, Select } from 'antd'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { RangeValue } from 'rc-picker/lib/interface'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { IProfessor, available } from './Professor.type'

const { Option } = Select

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

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const initialValue = [{ name: 'Once/Week', value: 'Once/Week' }]

    const [formDisabled, setFormDisabled] = useState<boolean>(false)
    const [semester, setSemester] = useState('Fall')
    const [ableToTeach, setAbleToTeach] = useState((!formDisabled).toString())
    const [reason, setReason] = useState('')
    const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs]>([dayjs('', 'HH:mm'), dayjs('', 'HH:mm')])
    const [numberOfClasses, setNumberOfClasses] = useState(0)
    const [classFormat, setClassFormat] = useState(initialValue)
    const [courses, setCourses] = useState([])
    const [selctedCourses, setSelectedCourses] = useState([] as string[])
    const [user, setUser] = useState({} as IProfessor)

    useEffect(() => {
        fetchPreferences()
        fetchCourses()
    }, [])

    const fetchPreferences = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/users/' + localStorage.getItem('username')
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUser(data)
            })
    }

    const fetchCourses = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/courses'
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setCourses(data)
            })
    }

    useEffect(() => {
        if (user) {
            console.log(user)
            setNumberOfClasses(user.max_courses)
            if (user.available) setTimeRange([dayjs(user.available.F[0][0], 'HH:mm'), dayjs(user.available.F[0][1], 'HH:mm')])
            setSelectedCourses(user.course_pref)
        }
    }, [user])

    const getCoursePreferencesOptions = () => {
        return courses.map((course: any) => {
            return (
                <Option key={course.course} value={course.course}>
                    {course.course}
                </Option>
            )
        })
    }

    const handleChangePreferences = (value: string[]) => {
        setSelectedCourses(value)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        submitForm()
    }

    const submitForm = async (fromCallback?: boolean) => {
        const username = localStorage.getItem('username')

        const url = process.env.REACT_APP_BACKEND_URL + '/users/' + username

        const preferredTime = [timeRange[0].format('HH:mm'), timeRange[1].format('HH:mm')]
        const time = { F: [preferredTime], M: [preferredTime], R: [preferredTime], T: [preferredTime], W: [preferredTime] } as available

        const body = { max_courses: numberOfClasses, available: time, course_pref: selctedCourses }

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
        if (!fromCallback) navigate('/user') // Don't navigate if called from logout callback
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

    const onChangeRangePicker = (values: RangeValue<Dayjs>, formatString: [string, string]) => {
        if (values) {
            setTimeRange([values[0] ?? dayjs(), values[1] ?? dayjs()])
        } else {
            setTimeRange([dayjs(), dayjs()])
        }
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

    const onCancelButton = () => {
        navigate('/user')
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
                            <Radio.Button value='Spring' onChange={(e: any) => setSemester(e.target.value)}>
                                Spring
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
                                <RangePicker format='HH:mm' onChange={onChangeRangePicker} value={timeRange} />
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

                        <Form.Item label='Course Preferences' tooltip='Select the courses you are willing to teach' style={{ marginBottom: 20 }}>
                            <Select mode='multiple' style={{ width: '100%' }} onChange={handleChangePreferences} value={selctedCourses}>
                                {getCoursePreferencesOptions()}
                            </Select>
                        </Form.Item>

                        <Form.Item label='Number of Classes' tooltip='Input number of classes.' style={{ marginBottom: 20 }}>
                            <InputNumber min={0} max={6} value={numberOfClasses} onChange={onChangeNumberOfClasses} />
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
                            <Button type='primary' htmlType='button' style={{ marginRight: 200, backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }} onClick={() => onCancelButton()}>
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
