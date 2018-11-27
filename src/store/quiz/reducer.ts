
import { combineReducers } from 'redux'
import produce from 'immer'

import * as actions from '~/store/quiz/actions'
import { createFetchReducer } from '~/store/fetch/util'

import { IQuizQuestion, IQuizAnswer } from '~types'
import { QuizDifficulty, QuizType } from '~/store/quiz/constants'
import { IAction, IFetchQuizSuccessData } from '~/store/quiz/actions'

// TODO: Maybe swap with Redux ORM for extreme overkill?

export interface IStoredQuiz {
  id: string
  amount: number
  difficulty: QuizDifficulty
  type: QuizType
  questions: IQuizQuestion[]
  progress: {
    id: string,
  }
}

export interface IQuizzesById {
  [id: string]: IStoredQuiz
}

export interface IQuizzesReducerState {
  byId: IQuizzesById
  allIds: string[]
}

export function quizzes(
  state: IQuizzesReducerState = {
    byId: {},
    allIds: [],
  },
  action: IAction,
): IQuizzesReducerState {
  return Object.assign({}, produce(state, (draft) => {
    switch (action.type) {
      case actions.CREATE_QUIZ: {
        const { quiz } = action

        draft.byId[quiz.id] = {
          id: quiz.id,
          amount: quiz.amount,
          type: quiz.type,
          difficulty: quiz.difficulty,
          questions: quiz.questions,
          progress: {
            id: quiz.progress.id,
          },
        }

        draft.allIds.push(quiz.id)
      }
    }
  }))
}

export interface IStoredQuizProgress {
  id: string
  activeIndex: number
  answers: IQuizAnswer[]
  quiz: string
}

export interface IQuizProgressesById {
  [id: string]: IStoredQuizProgress
}

export interface IQuizProgressesReducerState {
  byId: IQuizProgressesById
  allIds: string[]
}

export function progresses(
  state: IQuizProgressesReducerState = {
    byId: {},
    allIds: [],
  },
  action: IAction,
): IQuizProgressesReducerState {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.CREATE_QUIZ: {
        draft.byId[action.quiz.progress.id] = {
          id: action.quiz.progress.id,
          answers: action.quiz.progress.answers,
          activeIndex: 0,
          quiz: action.quiz.id,
        }

        draft.allIds.push(action.quiz.progress.id)

        return
      }

      case actions.INCREMENT_QUIZ_PROGRESS: {
        const answer = draft.byId[action.progress.id]
        const incrementedIndex =
          Math.min(
            action.maxIndex,
            draft.byId[action.progress.id].activeIndex + 1,
          )

        answer.activeIndex = incrementedIndex

        return
      }

      case actions.DECREMENT_QUIZ_PROGRESS: {
        const progress = draft.byId[action.progress.id]
        const decrementedIndex =
          Math.max(0, draft.byId[action.progress.id].activeIndex - 1)

        progress.activeIndex = decrementedIndex

        return
      }

      case actions.SET_QUIZ_ANSWER: {
        const progress = draft.byId[action.progress.id]

        progress.answers[action.index] = action.answer

        return
      }

      case actions.SET_QUIZ_PROGRESS_INDEX: {
        const progress = draft.byId[action.progress.id]

        progress.activeIndex = action.index
      }
    }
  })
}

const fetches = createFetchReducer<IFetchQuizSuccessData, actions.IFetchQuizMeta>({
  REQUEST: actions.FETCH_QUIZ_REQUEST,
  FAILURE: actions.FETCH_QUIZ_FAILURE,
  SUCCESS: actions.FETCH_QUIZ_SUCCESS,
})

export interface IQuizFetchesReducerState extends ReturnType<typeof fetches> {}

export const reducers = {
  quizzes,
  fetches,
  progresses,
}

export interface IState {
  quizzes: IQuizzesReducerState
  progresses: IQuizProgressesReducerState
  fetches: IQuizFetchesReducerState
}

export default combineReducers<IState>(reducers)
