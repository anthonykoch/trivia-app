// @ts-ignore
import { call, all } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import cuid from 'cuid'

import reducer from '~/store/quiz/reducer'
import { fetchQuiz, watchStartQuiz } from '~/store/quiz/sagas'
import { QuizDifficulty, QuizType } from '~/store/quiz/constants'
import * as quizActions from '~/store/quiz/actions'
import api from '~/api'

const mockFetchId = '123'
const mockQuestions = [{ question: 'propane?' }]
const mockData = { results: mockQuestions }
const mockApiOptions = {
  id: '345',
  type: QuizType.Boolean,
  amount: 10,
  difficulty: QuizDifficulty.Hard,
}

const mockTriviaResponse = {
  status: 200,
  data: mockData,
}

const mockQuiz = {
  ...mockApiOptions,
  questions: mockQuestions,
}

describe('fetchQuiz', () => {
  it('retrieves trivia questions from trivia API', () => {
    return expectSaga(fetchQuiz, quizActions.fetchQuizRequest(mockFetchId, mockApiOptions))
      .provide([
        [matchers.call.fn(api.trivia.getQuestions), mockTriviaResponse],
      ])
      .put(quizActions.fetchQuizSuccess(mockFetchId, mockQuiz as any))
      .run()
  })

  it('puts a fetch quiz failure action when api returns rejected promise', () => {
    const error = new Error('lol')

    return expectSaga(fetchQuiz, quizActions.fetchQuizRequest(mockFetchId, mockApiOptions))
      .provide([
        [matchers.call.fn(api.trivia.getQuestions), Promise.reject(error)],
      ])
      .put(quizActions.fetchQuizFailure(mockFetchId, error))
      .run(false)
  })
})
