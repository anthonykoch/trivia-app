
import * as React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'
import 'normalize.css'

import App from '~/App'
import { globalStyle } from '~/styles/global-style'

injectGlobal(globalStyle)

const root = document.getElementById('root')

const render = (App, el) => {
  if (el !== null) {
    ReactDOM.render(<App />, el)
  }
}

render(App, root)
