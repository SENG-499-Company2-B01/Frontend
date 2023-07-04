import { HowToBackground, InstructionContentWrapper, InstructionLeftWrapper, InstructionRightWrapper, InstructionTextWrapper, SmallLogoWrapper, UserLogoWrapper, UserWrapper } from '../components/HowTo/HowTo'
import calendar from '../assets/icons/calendar_white.png'
import admin from '../assets/icons/admin.png'
import professors from '../assets/icons/professors.png'
import { H2, H3, H7, H8 } from '../components/atoms/typography'
import { SmallBlackButton } from '../components/atoms/button'
import { SimpleLink } from '../components/atoms/navLink'
import { goToTop } from '../components/navbar'

export const ProfessorHowTo = () => {
    return (
        <HowToBackground>
            <H3>GUIDE</H3>
            <H2>How do we use it?</H2>
            <UserWrapper>
                <UserLogoWrapper src={professors} />
                <H3>PROFESSORS</H3>
            </UserWrapper>
            <InstructionLeftWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Set your preferences</H8>
                        <H7>Using the the preferences page, professors are able to give their input about their preferred schedules. This includes availability, number of classes to teach, etc.</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/ProfPreferencePage'>
                        <SmallBlackButton>
                            <H7>PREFERENCES</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionLeftWrapper>

            <InstructionRightWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Receive generated schedule</H8>
                        <H7>Admin reviews and generates the schedule that follows the given preferences.</H7>
                    </InstructionTextWrapper>
                    <SmallLogoWrapper src={calendar} />
                </InstructionContentWrapper>
            </InstructionRightWrapper>

            <InstructionLeftWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Update your preferences</H8>
                        <H7>You can always update your preferences by submitting another survey input.</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/ProfPreferencePage' onClick={goToTop}>
                        <SmallBlackButton>
                            <H7>PREFERENCES</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionLeftWrapper>
        </HowToBackground>
    )
}

export const AdminHowTo = () => {
    return (
        <HowToBackground>
            <H3>GUIDE</H3>
            <H2>How do we use it?</H2>
            <UserWrapper>
                <UserLogoWrapper src={admin} />
                <H3>ADMINISTRATOR</H3>
            </UserWrapper>
            <InstructionLeftWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Review submitted preferences</H8>
                        <H7>Navigate to Professors page and review all the given preferences by clicking on the checklists whether their input has a hard or soft constraints.</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/Preferences' onClick={goToTop}>
                        <SmallBlackButton>
                            <H7>PREFERENCES</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionLeftWrapper>

            <InstructionRightWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Generate schedules</H8>
                        <H7>Generate the schedules that follow all the given preferences.</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/Generate' onClick={goToTop}>
                        <SmallBlackButton>
                            <H7>GENERATE</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionRightWrapper>

            <InstructionLeftWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Edit Courses</H8>
                        <H7>Add or remove courses that are listed in the database.</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/user' onClick={goToTop}>
                        <SmallBlackButton>
                            <H7>COURSES</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionLeftWrapper>

            <InstructionRightWrapper>
                <InstructionContentWrapper>
                    <InstructionTextWrapper>
                        <H8>Edit schedules</H8>
                        <H7>Move courses that are listed on generated schedules</H7>
                    </InstructionTextWrapper>
                    <SimpleLink to='/user' onClick={goToTop}>
                        <SmallBlackButton>
                            <H7>SCHEDULES</H7>
                        </SmallBlackButton>
                    </SimpleLink>
                </InstructionContentWrapper>
            </InstructionRightWrapper>
        </HowToBackground>
    )
}
