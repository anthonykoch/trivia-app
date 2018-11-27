
import cuid from 'cuid'
import { push } from 'connected-react-router'
import { call, takeEvery, takeLatest, put } from 'redux-saga/effects'

import api from '~/api'
import * as quizActions from '~/store/quiz/actions'
import { IHistoryState } from '~types'

import {
  IActionStartQuiz,
  IActionFetchQuizRequest,
} from '~/store/quiz/actions'

export function * fetchQuiz(action: IActionFetchQuizRequest) {
  const { meta: { quiz: options } } = action

  try {
    const res = yield call(api.trivia.getQuestions, {
      amount: options.amount,
      type: options.type,
      difficulty: options.difficulty,
    })

    if (res.status === 200) {
      yield put(quizActions.fetchQuizSuccess(action.id, {
        ...options,
        questions: res.data.results,
      }))
    } else {
      yield put(quizActions.fetchQuizFailure(action.id, { status: res.status }))
    }
  } catch (err) {
    yield put(quizActions.fetchQuizFailure(action.id, err))
  }
}

export function * startQuiz(action: IActionStartQuiz) {
  const {
    id = cuid(),
    difficulty,
    amount,
    type,
  } = action.quiz

  const fetchId = cuid()
  const historyMeta: IHistoryState = { quizMeta: { quizId: id, fetchId } }

  yield put(push('/quiz', historyMeta))

  yield put(quizActions.fetchQuizRequest(fetchId, {
    id,
    difficulty,
    amount,
    type,
  }))
}

export function * createQuiz(action: quizActions.IActionFetchQuizSuccess) {
  const progressId = cuid()

  const quiz = {
    ...action.data,
    progress: {
      id: progressId,
      answers: [],
      activeIndex: 0,
    },
  }

  yield put(quizActions.createQuiz(quiz))
}

export function * watchFetchQuizRequest() {
  yield takeLatest(quizActions.FETCH_QUIZ_REQUEST, fetchQuiz)
}

export function * watchFetchQuizSuccess() {
  yield takeLatest(quizActions.FETCH_QUIZ_SUCCESS, createQuiz)
}

export function * watchStartQuiz() {
  yield takeEvery(quizActions.START_QUIZ, startQuiz)
}

export default [
  watchFetchQuizRequest,
  watchFetchQuizSuccess,
  watchStartQuiz,
]
