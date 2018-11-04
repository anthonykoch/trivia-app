// @flow

import { all, fork } from 'redux-saga/effects'
import _ from 'lodash'

import * as trivia from './trivia'

import type { Saga } from 'redux-saga'

export default function * rootSaga(): Saga<void> {
  const watchers =
    _.values({
      ...trivia,
    })
      .map((watcher) => fork(watcher))

  yield all(watchers)
}
