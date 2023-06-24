import { H2 } from '../components/atoms/typography'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Homepage/homepage.css'
import { NavBarAdmin } from '../components/navbar'
import { Button, Form, Input } from 'antd'

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

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    return (
        <div className='row'>
            <NavBarAdmin />
            <div style={{ textAlign: 'center' }}>
                <H2>Create Account</H2>
                <Form form={form} name='createAccount' layout='vertical' autoComplete='off' onFinish={onFinish} style={{ maxWidth: 600, margin: 'auto' }} scrollToFirstError>
                    <Form.Item name='email' label='Email' tooltip='Input email.' style={{ marginBottom: 20 }} rules={[{ type: 'email', required: true, message: 'Please input email!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='firstName' label='First Name' tooltip='Input first name.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input first name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='lastName' label='Last Name' tooltip='Input last name.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input last name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='fieldOfExpertise' label='Field of Expertise' tooltip='Input field of expertise.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input field of expertise!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='yearsOfExperience' label='Years of Experience' tooltip='Input years of experience.' style={{ marginBottom: 20 }} rules={[{ type: 'number', min: 0, max: 50, required: true, message: 'Please input years of experience!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='highestEducationObtained' label='Highest Education Obtained' tooltip='Input highest education obtained.' style={{ marginBottom: 20 }} rules={[{ required: true, message: 'Please input highest education obtained!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='password' label='Password' tooltip='Input password.' style={{ marginBottom: 20 }} hasFeedback rules={[{ required: true, message: 'Please input password!' }]}>
                        <Input.Password />
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
                            <Button type='primary' htmlType='submit' style={{ marginLeft: 200, backgroundColor: '#2c2a2a', color: '#ffffff', borderRadius: 32 }}>
                                CREATE ACCOUNT
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
