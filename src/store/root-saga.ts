
import { all, fork } from 'redux-saga/effects'

import quiz from '~/store/quiz/sagas'

export default function * rootSaga() {
  const watchers = [
      ...quiz,
    ]
    .map((watcher: any) => fork(watcher))

  yield all(watchers)
}
