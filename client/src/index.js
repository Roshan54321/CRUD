import React from 'react'
import ReactDom from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = createRoot(document.getElementById('root'))
root.render(
        <Provider store = {store}>
            <App/>
        </Provider>
    )
