import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import QuizBox from './Components/QuizBox.jsx'
import Signup from './Components/Signup.jsx'
import UserLogin from './Components/UserLogin.jsx'
import Userpage from './Components/Userpage.jsx'
import LandingPage from './Components/landingPage.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route path='' element={<LandingPage />} />
        <Route path='test' element={<QuizBox />} />
        <Route path='signup' element={<Signup />} />
        <Route path='userpage' element={<Userpage />} />
        <Route path='login' element={<UserLogin />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>,
)
