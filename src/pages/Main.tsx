import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Loading } from './Loading'
import { Login } from './Login'
import { CreateAccountPage } from './CreateAccountPage'
import { Practice } from './Practice'
import { ProfHomepage } from './ProfHomepage'
import { ProfPreferencePage } from './ProfPreferencePage'
import { LogoutPage } from './LoggedOut'
import { Generate } from './Generate'
import { NewPreferences } from './NewPreferences'
import { ProfTimetable } from './ProfTimetable'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Timetable } from './Timetable'
import { ProfProfilePage } from './ProfProfile'

// Routes the web application to different pages

const Main = () => (
    <Routes>
        <Route
            path='/home'
            element={
                <>
                    <Home />
                </>
            }
        />
        <Route
            path='/'
            element={
                <>
                    <Login />
                </>
            }
        />
        <Route
            path='/CreateAccountPage'
            element={
                <>
                    <CreateAccountPage />
                </>
            }
        />
        <Route
            path='/profview'
            element={
                <>
                    <ProfTimetable />
                </>
            }
        />
        <Route
            path='/practice'
            element={
                <>
                    <Practice />
                </>
            }
        />
        <Route
            path='/ProfProfile'
            element={
                <>
                    <ProfProfilePage />
                </>
            }
        />
        <Route
            path='/ProfHomepage'
            element={
                <>
                    <ProfHomepage />
                </>
            }
        />
        <Route
            path='/ProfPreferencePage'
            element={
                <>
                    <ProfPreferencePage />
                </>
            }
        />
        <Route
            path='/Preferences'
            element={
                <>
                    <NewPreferences />
                </>
            }
        />
        <Route
            path='logout'
            element={
                <>
                    <LogoutPage />
                </>
            }
        />
        <Route
            path='/user'
            element={
                <>
                    <Loading />
                </>
            }
        ></Route>
        <Route
            path='/generate'
            element={
                <>
                    <Generate />
                </>
            }
        ></Route>
        <Route
            path='/timetable'
            element={
                <>
                    <Timetable />
                </>
            }
        ></Route>
    </Routes>
)

export default Main
