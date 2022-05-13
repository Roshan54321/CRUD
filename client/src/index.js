import React from 'react'
import ReactDom from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './routes/App'
import Register from './routes/Register'
import Login from './routes/Login'
import Invalidpage from './routes/Invalidpage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./index.css"

const root = createRoot(document.getElementById('root'))
root.render(
        <Provider store = {store}>
            <Router>
                <Routes>
                    <Route path='/' element={<App/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='*' element={<Invalidpage/>}></Route>
                </Routes>
            </Router>
        </Provider>
    )
