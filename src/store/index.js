// @flow

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const store = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(sagas)
