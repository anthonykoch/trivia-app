// @flowr

import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import 'normalize.css'
import App from './App'

injectGlobal`
*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-size: 1rem;
  line-height: 1.7;
  min-height: 100vh;
  text-rendering: geometricPrecision;
  width: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

const root = document.getElementById('root')

const render = (App, el) => {
  if (root !== null) {
    ReactDOM.render(<App />, el)
  }
}

render(App, root)
