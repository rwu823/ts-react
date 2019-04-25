import React from 'react'
import { render } from 'react-dom'

import App from './App'

const app = document.createElement('div')
app.id = 'app'

document.body.appendChild(app)

render(<App />, app)
