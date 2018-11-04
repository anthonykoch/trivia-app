// @flow

import { push } from 'connected-react-router'
import { call, put, takeLatest } from 'redux-saga/effects'

import * as triviaActions from '../actions/trivia'
import { getTrivia } from '../api/trivia'

import type { Saga } from 'redux-saga'

function * getTriviaQuestions(): Saga<void> {
  try {
    const res = yield call(getTrivia)

    if (res.status === 200) {
      yield put(triviaActions.fetchTriviaSuccess(res.data.results))
    } else {
      const error = { status: res.status }

      yield put(triviaActions.fetchTriviaFailure({ error }))
    }
  } catch (err) {
    yield put(triviaActions.fetchTriviaFailure(err))
  }
}

function * startQuiz(): Saga<void> {
  yield put(triviaActions.resetQuiz())
  yield put(triviaActions.fetchTrivia())
  yield put(push('/quiz'))
}

export function * watchFetchTrivia(): Saga<*> {
  yield takeLatest(triviaActions.FETCH_TRIVIA_REQUEST, getTriviaQuestions)
}

export function * watchStartQuiz(): Saga<*> {
  yield takeLatest(triviaActions.START_QUIZ, startQuiz)
}
