import { H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'

import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Radio, Space, TimePicker } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import type { Dayjs } from 'dayjs'

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

const onChange = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString)
}

export const ProfPreferencePage: React.FC = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const [formDisabled, setFormDisabled] = useState<boolean>(false)

    return (
        <div>
            <NavBarProf />
            <div className='cen'>
                <H2>Preference</H2>
                <Form {...formItemLayout} form={form} name='preference' onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError>
                    <Form.Item name='semester' label='Semester' tooltip='Select a semester.' style={{ marginBottom: 20 }}>
                        <Radio.Group defaultValue='Fall'>
                            <Radio.Button value='Fall'>Fall</Radio.Button>
                            <Radio.Button value='Winter'>Winter</Radio.Button>
                            <Radio.Button value='Summer'>Summer</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name='ableToTeach' label='Able To Teach' tooltip='Are you able to teach this semester?' style={{ marginBottom: 20 }}>
                        <Radio.Group defaultValue='Yes' style={{ marginBottom: 10 }}>
                            <Radio value='Yes' checked={formDisabled} onChange={(e) => setFormDisabled(!e.target.checked)}>
                                Yes
                            </Radio>
                            <Radio value='No' checked={formDisabled} onChange={(e) => setFormDisabled(e.target.checked)}>
                                No
                            </Radio>
                        </Radio.Group>
                        <Form.Item name='reason' rules={[{ required: formDisabled, message: 'Please input reason!' }]}>
                            <Input.TextArea showCount maxLength={100} placeholder='Reason' />
                        </Form.Item>
                    </Form.Item>

                    <Form {...formItemLayout} form={form} name='preference' onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError disabled={formDisabled}>
                        <Form.Item name='preferredTime' label='Preferred Time' tooltip='Input preferred time.' style={{ marginBottom: 20 }}>
                            <Space align='baseline' style={{ marginBottom: 10 }}>
                                <TimePicker use12Hours format='h:mm a' onChange={onChange} style={{ marginRight: 8, display: 'inline-block' }} placeholder='Start Time' />
                                <TimePicker use12Hours format='h:mm a' onChange={onChange} style={{ display: 'inline-block' }} placeholder='End Time' />
                            </Space>
                            <Form.List name='added preferred time'>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <Space key={field.key} align='baseline'>
                                                <Form.Item {...field} name={[field.name, 'start and end time']} rules={[{ required: true, message: 'Missing start and end time!' }]} style={{ marginBottom: 10 }}>
                                                    <Space align='baseline'>
                                                        <TimePicker use12Hours format='h:mm a' onChange={onChange} style={{ marginRight: 8, display: 'inline-block' }} placeholder='Start Time' />
                                                        <TimePicker use12Hours format='h:mm a' onChange={onChange} style={{ display: 'inline-block' }} placeholder='End Time' />
                                                    </Space>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        ))}
                                        <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '260px' }}>
                                            Add
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>

                        <Form.Item name='numberOfClasses' label='Number of Classes' tooltip='Input number of classes.' style={{ marginBottom: 20 }} rules={[{ type: 'number', required: !formDisabled, message: 'Please input number of classes between 0 and 999!', min: 0, max: 999 }]}>
                            <InputNumber />
                        </Form.Item>

                        <Form.Item name='classFormat' label='Class Format' tooltip='Select one or more preferred class formats' style={{ marginBottom: 20 }}>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Form.Item style={{ marginBottom: 10 }} rules={[{ required: !formDisabled, message: 'Please input preferred class format!' }]}>
                                        <Checkbox style={{ marginBottom: 5 }}>Once/Week</Checkbox>
                                        <Checkbox style={{ marginBottom: 5 }}>M, R</Checkbox>
                                        <Checkbox style={{ marginBottom: 5 }}>T, W, F</Checkbox>
                                        <Checkbox style={{ marginBottom: 5 }}>Online</Checkbox>
                                    </Form.Item>
                                    <Form.Item name='Class Format' noStyle rules={[{ required: false }]}>
                                        <Input placeholder='Other' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>

                    <Form.Item {...tailFormItemLayout}>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='reset' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                CLEAR
                            </Button>
                        </div>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='button' style={{ marginRight: 200, backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                CANCEL
                            </Button>
                            <Button type='primary' htmlType='submit' style={{ backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                SUBMIT
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
