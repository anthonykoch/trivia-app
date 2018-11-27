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

describe.skip('watchStartQuiz', () => {
  it.skip('affects the state', () => {
    const mockStoredProgress = {
      id: cuid(),
      activeIndex: 0,
      answers: [],
      quiz: {
        id: cuid(),
      },
    }

    const mockStoredQuiz = {
      id: mockStoredProgress.quiz.id,
      ...mockApiOptions,
      questions: mockQuestions,
      progress: {
        id: mockStoredProgress.id,
      },
    }

    return expectSaga(watchStartQuiz)
      .provide([
        [matchers.call.fn(api.trivia.getQuestions), mockTriviaResponse],
      ])
      .withReducer(reducer)
      .dispatch(quizActions.startQuiz({
        id: mockStoredQuiz.id,
        ...mockApiOptions,
      }))
      .run(false)
      // .then((result) => {
      //   expect(result.storeState.quizzes).toMatchObject({
      //     byId: {
      //       [mockStoredQuiz.id]: mockStoredQuiz,
      //     },
      //     allIds: [mockStoredQuiz.id],
      //   })

      //   expect(result.storeState.progresses).toMatchObject({
      //     byId: {
      //       [mockStoredProgress.id]: mockStoredProgress,
      //     },
      //     allIds: [mockStoredProgress.id],
      //   })
      // })
  })
})
