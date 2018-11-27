
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from 'emotion-theming'

import styled, { theme } from '~/styles/theme'
import { GlobalContainer } from '~/styles/global-style'
import HomeScreenContainer from '~/screens/HomeScreen/HomeScreenContainer'
import QuizScreenContainer from '~/screens/QuizScreen/QuizScreenContainer'
import NotFoundScreen from '~/screens/NotFoundScreen/NotFoundScreen'

import { store, history } from '~/store'

const Container = styled(GlobalContainer)`
  background-color: #eeeeee;
  min-height: 100vh;
`

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Container>
            <Switch>
              <Route exact path="/" component={HomeScreenContainer} />
              <Route path="/quiz" component={QuizScreenContainer} />
              <Route component={NotFoundScreen} />
            </Switch>
          </Container>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(module)(App)
