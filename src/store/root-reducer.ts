
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import quiz from '~/store/quiz/reducer'

export default (history: History) => combineReducers({
  quiz,
  router: connectRouter(history),
})
