// @flow

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import * as triviaReducers from './trivia'

const reducers = {
  ...triviaReducers,
}

export type Reducers = typeof reducers
export type AppState = $ObjMap<Reducers, ExtractReturnType>;

// $FlowFixMe: Unsure of why Flow thinks this is invalid
export default (history) => combineReducers({
  ...reducers,
  router: connectRouter(history),
})
