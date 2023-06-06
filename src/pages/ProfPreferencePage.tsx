import { MediumBlackButton, MediumBlueButton, MediumRedButton, MediumWhiteButton, BlackButton } from '../components/atoms/button'
import { H1, H2 } from '../components/atoms/typography'
import { HomeBackground } from '../components/home/background'
import { InputField } from '../components/atoms/input_field'
import { NavUnlisted } from '../components/atoms/navLink'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarProf } from '../components/navbar'

import type { CascaderProps } from 'antd'
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Radio, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface DataNodeType {
    value: string
    label: string
    children?: DataNodeType[]
}

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
                    <Form.Item name='semester' label='Semester' tooltip='Which semester do you want to teach?' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please select the semester!', whitespace: true }]}>
                        <Radio.Group defaultValue='Fall 2023'>
                            <Radio.Button value='Fall 2023'>Fall 2023</Radio.Button>
                            <Radio.Button value='Winter 2024'>Winter 2024</Radio.Button>
                            <Radio.Button value='Summer 2024'>Summer 2024</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name='ableToTeach' label='Able To Teach' tooltip='Are you able to teach this semester?' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please select yes or no!', whitespace: true }]}>
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

                    <Form {...formItemLayout} form={form} name='preference' onFinish={onFinish} initialValues={{ prefix: '86' }} style={{ maxWidth: 600 }} scrollToFirstError disabled={formDisabled}>
                        <Form.Item name='preferredTime' label='Preferred Time' tooltip='Which is your preferred time?' style={{ marginBottom: 20 }} rules={[{ required: !formDisabled, message: 'Please input preferred time!' }]}>
                            <Select placeholder='Day' style={{ marginRight: 8, display: 'inline-block', width: 'calc(30% - 8px)' }}>
                                <Option value='M'>M</Option>
                                <Option value='T'>T</Option>
                                <Option value='W'>W</Option>
                                <Option value='R'>R</Option>
                                <Option value='F'>F</Option>
                            </Select>
                            <Form.Item name='Hour' noStyle rules={[{ required: false }]}>
                                <Input placeholder='Hour' style={{ marginRight: 8, display: 'inline-block', width: 'calc(30% - 8px)' }} />
                            </Form.Item>
                            <Form.Item name='Min' noStyle rules={[{ required: false }]}>
                                <Input placeholder='Min' style={{ marginRight: 8, display: 'inline-block', width: 'calc(30% - 8px)' }} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item name='classSize' label='Class Size' tooltip='Which class size do you prefer to teach?' style={{ marginBottom: 20 }} rules={[{ required: !formDisabled, message: 'Please input your preferred class size!', whitespace: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='classFormat' label='Class Format' tooltip='Which class format do you prefer to teach?' style={{ marginBottom: 20 }} rules={[{ required: !formDisabled, message: 'Please input preferred class format!' }]}>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <Checkbox style={{ marginBottom: 5 }}>Once/Week</Checkbox>
                                    <Checkbox style={{ marginBottom: 5 }}>M, R</Checkbox>
                                    <Checkbox style={{ marginBottom: 5 }}>T, W, F</Checkbox>
                                    <Checkbox style={{ marginBottom: 5 }}>Online</Checkbox>
                                    <Form.Item name='Class Format' noStyle rules={[{ required: false }]}>
                                        <Input placeholder='Other' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>

                    <Form.Item {...tailFormItemLayout}>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='reset' color='#ffffff'>
                                CLEAR
                            </Button>
                        </div>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Button type='primary' htmlType='button' color='#ffffff' style={{ marginRight: 200 }}>
                                CANCEL
                            </Button>
                            <Button type='primary' htmlType='submit' color='#ffffff'>
                                SUBMIT
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
