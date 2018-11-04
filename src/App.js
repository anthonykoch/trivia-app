// @flow

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from 'emotion-theming'
import styled, { css } from 'react-emotion'

import Home from './pages/Home'
import Quiz from './pages/Quiz'
import NotFound from './pages/NotFound'

import { store, history } from './store'
import theme, { type Theme } from './styles/theme'

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/quiz" component={Quiz} />
              <Route component={NotFound} />
            </Switch>
          </GlobalStyle>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

const GlobalStyle = styled('div')`
  background-color: #eeeeee;
  min-height: 100vh;

  ${({ theme }: { theme: Theme }) => css`
    font-family: ${theme.font1}
  `}
`

export default hot(module)(App)
