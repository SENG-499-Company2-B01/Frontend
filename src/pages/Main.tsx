import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Loading } from './Loading'
import { Login } from './Login'
import { CreateAccountPage } from './CreateAccountPage'
import { Practice } from './Practice'
import { ProfHomepage } from './ProfHomepage'
import { ProfPreferencePage } from './ProfPreferencePage'
import { Preferences } from './Preferences'
import { LogoutPage } from './LoggedOut'
import { Generate } from './Generate'

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
            path='/practice'
            element={
                <>
                    <Practice />
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
                    <Preferences />
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
    </Routes>
)

export default Main
