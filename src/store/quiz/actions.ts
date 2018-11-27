
import cuid from 'cuid'

import { IStoredQuiz } from '~/store/quiz/reducer'
import { QuizDifficulty, QuizType } from '~/store/quiz/constants'
import { IActionFetchSuccess, IActionFetchRequest, IActionFetchFailure, IFetchFailureError } from '~/store/fetch/util'
import { IQuizQuestion, IQuizAnswer, ILoadedResource, ILoadFailedResource, ILoadingResource, IQuizProgress } from '~types'

export const FETCH_QUIZ_REQUEST = '@@quiz/FETCH_QUIZ_REQUEST'
export const FETCH_QUIZ_FAILURE = '@@quiz/FETCH_QUIZ_FAILURE'
export const FETCH_QUIZ_SUCCESS = '@@quiz/FETCH_QUIZ_SUCCESS'
export const FETCH_QUIZ_DELETE = '@@quiz/FETCH_QUIZ_DELETE'
export const CREATE_QUIZ = '@@quiz/CREATE_QUIZ'
export const START_QUIZ = '@@quiz/START_QUIZ'
export const CREATE_QUIZ_PROGRESS = '@@quiz/CREATE_QUIZ_PROGRESS'
export const SET_QUIZ_ANSWER = '@@quiz/SET_QUIZ_ANSWER'
export const SET_QUIZ_PROGRESS_INDEX = '@@quiz/SET_QUIZ_PROGRESS_INDEX'
export const INCREMENT_QUIZ_PROGRESS = '@@quiz/INCREMENT_QUIZ_PROGRESS'
export const DECREMENT_QUIZ_PROGRESS = '@@quiz/DECREMENT_QUIZ_PROGRESS'

export interface IFetchQuizData {
  id: string
  type: QuizType
  difficulty: QuizDifficulty
  amount: number
  questions: IQuizQuestion[]
}

export interface IQuizRelations {
  progress: IQuizProgress
}

export interface IFetchQuizMeta {
  quiz: IFetchQuizOptions
}

export interface IFetchQuizOptions {
  id: string
  type: QuizType
  difficulty: QuizDifficulty
  amount: number
}

export interface IFetchQuizSuccessData extends IFetchQuizData {}

export type IQuizResource<Data = IStoredQuiz> =
  ILoadedResource<Data, IFetchQuizMeta> |
  ILoadFailedResource<IFetchQuizMeta> |
  ILoadingResource<IFetchQuizMeta>

export interface IActionCreateQuiz {
  type: '@@quiz/CREATE_QUIZ'
  quiz: IFetchQuizData & IQuizRelations
}

export interface IActionStartQuiz {
  type: '@@quiz/START_QUIZ'
  quiz: IFetchQuizOptions
}

export interface IActionSetQuizProgressIndex {
  type: '@@quiz/SET_QUIZ_PROGRESS_INDEX'
  index: number
  maxIndex: number,
  progress: {
    id: string,
  }
}

export interface IActionSetQuizAnswer {
  type: '@@quiz/SET_QUIZ_ANSWER'
  index: number
  answer: IQuizAnswer
  progress: {
    id: string,
  }
}

export interface IActionIncrementQuizProgressIndex {
  type: '@@quiz/INCREMENT_QUIZ_PROGRESS'
  progress: {
    id: string,
  }
  maxIndex: number
}

export interface IActionDecrementQuizProgressIndex {
  type: '@@quiz/DECREMENT_QUIZ_PROGRESS'
  progress: {
    id: string,
  }
}

export interface IActionCreateQuizProgress {
  type: '@@quiz/CREATE_QUIZ_PROGRESS'
  progress: {
    id: string,
    answers: IQuizAnswer[],
    activeIndex: number,
    quiz: string,
  }
}
export interface IActionFetchQuizRequest extends IActionFetchRequest<typeof FETCH_QUIZ_REQUEST, IFetchQuizMeta> {}

export interface IActionFetchQuizSuccess extends IActionFetchSuccess<typeof FETCH_QUIZ_SUCCESS, IFetchQuizData> {}

export interface IActionFetchQuizFailure extends IActionFetchFailure<typeof FETCH_QUIZ_FAILURE> {}

export type IAction =
  IActionFetchQuizRequest |
  IActionFetchQuizSuccess |
  IActionFetchQuizFailure |
  IActionStartQuiz |
  IActionSetQuizProgressIndex |
  IActionSetQuizAnswer |
  IActionIncrementQuizProgressIndex |
  IActionDecrementQuizProgressIndex |
  IActionCreateQuiz |
  IActionCreateQuizProgress

export const fetchQuizRequest = (id: string = cuid(), quiz: IFetchQuizOptions): IActionFetchQuizRequest => ({
  type: FETCH_QUIZ_REQUEST,
  id,
  meta: {
    quiz,
  },
})

export const fetchQuizSuccess = (
  id: string,
  quiz: IFetchQuizSuccessData,
): IActionFetchQuizSuccess => ({
  type: FETCH_QUIZ_SUCCESS,
  id,
  data: quiz,
})

export const fetchQuizFailure = (id: string, error: IFetchFailureError): IActionFetchQuizFailure => ({
  type: FETCH_QUIZ_FAILURE,
  id,
  error,
})

export const startQuiz = ({
  id = cuid(),
  amount,
  difficulty,
  type,
}: {
  id?: string,
  amount: number,
  difficulty: QuizDifficulty,
  type: QuizType,
}): IActionStartQuiz => ({
  type: START_QUIZ,
  quiz: {
    id,
    amount,
    difficulty,
    type,
  },
})

export const createQuiz = (
  quiz: IFetchQuizData & IQuizRelations,
): IActionCreateQuiz => ({
  type: CREATE_QUIZ,
  quiz,
})

export const incrementQuizProgressIndex = (
  progress: {
    id: string,
  },
  maxIndex: number,
): IActionIncrementQuizProgressIndex => ({
  type: INCREMENT_QUIZ_PROGRESS,
  progress,
  maxIndex,
})

export const decrementQuizProgressIndex = (
  progress: {
    id: string,
  },
): IActionDecrementQuizProgressIndex => ({
  type: DECREMENT_QUIZ_PROGRESS,
  progress,
})

export const setQuizAnswer = (
  progress: {
    id: string,
  },
  index: number,
  answer: IQuizAnswer,
): IActionSetQuizAnswer => ({
  type: SET_QUIZ_ANSWER,
  progress,
  index,
  answer,
})

export const setQuizProgressIndex = (
  progress: {
    id: string,
  },
  maxIndex: number,
  index: number,
): IActionSetQuizProgressIndex => ({
  type: SET_QUIZ_PROGRESS_INDEX,
  progress,
  maxIndex,
  index,
})

export const createQuizProgress = (
  progress: {
    id: string,
    answers: IQuizAnswer[],
    activeIndex: number,
    quiz: string,
  },
): IActionCreateQuizProgress => ({
  type: CREATE_QUIZ_PROGRESS,
  progress,
})
