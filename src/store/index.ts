
import { createBrowserHistory, Location } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, RouterState } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import createRootReducer from '~/store/root-reducer'
import sagas from '~/store/root-saga'
import { IHistoryState } from '~types'

export interface IRouterState extends RouterState {
  location: Location<IHistoryState | undefined | null>
}

export type IAppState = ReturnType<ReturnType<typeof createRootReducer>> & {
  router: IRouterState,
}

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory({
  basename: process.env.BASENAME,
})

export const store = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(
      ...[
        routerMiddleware(history),
        sagaMiddleware,
        process.env.NODE_ENV === 'development' ? logger : null,
      ].filter((item) => item),
    ),
  ),
)

sagaMiddleware.run(sagas)
