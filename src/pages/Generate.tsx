import { BlackButton } from '../components/atoms/button'
import { H1, H2, H3 } from '../components/atoms/typography'
import { ApprovedCard, CardsWrapper, GenerateBackground, LogoWrapper, UnapprovedCard } from '../components/Generate/generate'
import { NavBarAdmin } from '../components/navbar'
import Check from '../assets/icons/Check_ring.png'
import XMark from '../assets/icons/Dell.png'
import { Form, Radio } from 'antd'

export const Generate = () => {
    const [form] = Form.useForm()

    return (
        <div>
            <NavBarAdmin />
            <GenerateBackground>
                <H2>Generate Schedule</H2>
                <CardsWrapper>
                    <ApprovedCard>
                        <LogoWrapper src={Check} />
                        <H2>17</H2>
                        <H3>Approved preferences</H3>
                    </ApprovedCard>
                    <UnapprovedCard>
                        <LogoWrapper src={XMark} />
                        <H2>2</H2>
                        <H3>Unapproved preferences</H3>
                    </UnapprovedCard>
                </CardsWrapper>
                <Form form={form} name='preference' scrollToFirstError>
                    <Form.Item name='semester' style={{ margin: 0 }}>
                        <Radio.Group defaultValue='Fall'>
                            <Radio.Button value='Fall'>Fall</Radio.Button>
                            <Radio.Button value='Winter'>Winter</Radio.Button>
                            <Radio.Button value='Summer'>Summer</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <BlackButton>
                    <H1>START GENERATING</H1>
                </BlackButton>
            </GenerateBackground>
        </div>
    )
}
