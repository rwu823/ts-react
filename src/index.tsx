import React from 'react'
import { render } from 'react-dom'

import App from './App'

const app = document.createElement('div')
document.body.appendChild(app)

render(<App />, app)
