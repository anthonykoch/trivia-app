// @flow

import type { TriviaQuestion, BooleanTriviaAnswer } from '../../types'

export const FETCH_TRIVIA_REQUEST = 'FETCH_TRIVIA_REQUEST'
export const FETCH_TRIVIA_FAILURE = 'FETCH_TRIVIA_FAILURE'
export const FETCH_TRIVIA_SUCCESS = 'FETCH_TRIVIA_SUCCESS'

export const START_QUIZ = 'START_QUIZ'
export const RESET_QUIZ = 'RESET_QUIZ'
export const SET_QUIZ_ANSWER = 'SET_QUIZ_ANSWER'
export const SET_QUIZ_INDEX = 'SET_QUIZ_INDEX'
export const INCREMENT_QUIZ_INDEX = 'INCREMENT_QUIZ_INDEX'
export const DECREMENT_QUIZ_INDEX = 'DECREMENT_QUIZ_INDEX'



export type ActionFetchTriviaRequest = {
  type: 'FETCH_TRIVIA_REQUEST',
}

export type ActionFetchTriviaSuccess = {
  type: 'FETCH_TRIVIA_SUCCESS',
  quiz: TriviaQuestion[],
}

export type ActionFetchTriviaFailure = {
  type: 'FETCH_TRIVIA_FAILURE',
}

export type ActionResetQuiz = {
  type: 'RESET_QUIZ',
}

export type ActionStartQuiz = {
  type: 'START_QUIZ',
}

export type ActionSetQuizIndex = {
  type: 'SET_QUIZ_INDEX',
  index: number,
}

export type ActionSetQuizAnswer = {
  type: 'SET_QUIZ_ANSWER',
  index: number,
  answer: BooleanTriviaAnswer,
}

export type ActionIncrementQuizIndex = {
  type: 'INCREMENT_QUIZ_INDEX',
}

export type ActionDecrementQuizIndex = {
  type: 'DECREMENT_QUIZ_INDEX',
}



export const fetchTrivia = () => ({
  type: FETCH_TRIVIA_REQUEST,
})

export const fetchTriviaSuccess = (quiz: TriviaQuestion[]): ActionFetchTriviaSuccess => ({
  type: FETCH_TRIVIA_SUCCESS,
  quiz,
})

export const fetchTriviaFailure = (error: any): ActionFetchTriviaFailure => ({
  type: FETCH_TRIVIA_FAILURE,
  error,
})



export const resetQuiz = (): ActionResetQuiz => ({
  type: RESET_QUIZ,
})

export const startQuiz = (): ActionStartQuiz => ({
  type: START_QUIZ,
})

export const incrementQuizIndex = (): ActionIncrementQuizIndex => ({
  type: INCREMENT_QUIZ_INDEX,
})

export const decrementQuizIndex = (): ActionDecrementQuizIndex => ({
  type: DECREMENT_QUIZ_INDEX,
})

export const setQuizAnswer = (index: number, answer: BooleanTriviaAnswer): ActionSetQuizAnswer => ({
  type: SET_QUIZ_ANSWER,
  index,
  answer,
})

export const setQuizIndex = (index: number): ActionSetQuizIndex => ({
  type: SET_QUIZ_INDEX,
  index,
})
