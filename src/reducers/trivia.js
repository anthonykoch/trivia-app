// @flow

import {
  FETCH_TRIVIA_REQUEST,
  FETCH_TRIVIA_FAILURE,
  FETCH_TRIVIA_SUCCESS,
  SET_QUIZ_ANSWER,
  SET_QUIZ_INDEX,
  RESET_QUIZ,
  START_QUIZ,
  INCREMENT_QUIZ_INDEX,
  DECREMENT_QUIZ_INDEX,
} from '../actions/trivia'

import type {
  ActionFetchTriviaRequest,
  ActionFetchTriviaSuccess,
  ActionFetchTriviaFailure,
  ActionSetQuizIndex,
  ActionSetQuizAnswer,
  ActionResetQuiz,
  ActionStartQuiz,
  ActionIncrementQuizIndex,
  ActionDecrementQuizIndex,
} from '../actions/trivia'

import type { TriviaReducerState } from '../../types'

export type Action =
  ActionFetchTriviaRequest |
  ActionFetchTriviaSuccess |
  ActionFetchTriviaFailure |
  ActionSetQuizIndex |
  ActionSetQuizAnswer |
  ActionIncrementQuizIndex |
  ActionDecrementQuizIndex |
  ActionResetQuiz |
  ActionStartQuiz

const initialState = {
  quiz: [],
  answers: [],
  activeIndex: 0,
  quizLength: 10,
  hasStartedQuiz: false,
  hasFailedFetchingQuiz: false,
  isFetchingQuiz: false,
  isQuizFinished: false,
}

const getQuizStatus = (quiz, index) => {
  const length = quiz.length

  return {
    isQuizFinished: quiz.length !== 0 && length === index,
  }
}

export function trivia(state: TriviaReducerState=initialState, action: Action) {
  switch (action.type) {
    case FETCH_TRIVIA_REQUEST:
      return {
        ...state,
        isFetchingQuiz: true,
      }

    case FETCH_TRIVIA_FAILURE:
      return {
        ...state,
        isFetchingQuiz: false,
        hasFailedFetchingQuiz: true,
      }

    case FETCH_TRIVIA_SUCCESS:
      return {
        ...state,
        isFetchingQuiz: false,
        hasFailedFetchingQuiz: false,
        quiz: action.quiz,
      }

    case INCREMENT_QUIZ_INDEX:
      const newIncrementedIndex = Math.min(state.quizLength, state.activeIndex + 1)

      return {
        ...state,
        ...getQuizStatus(state.quiz, newIncrementedIndex),
        activeIndex: newIncrementedIndex,
      }

    case DECREMENT_QUIZ_INDEX:
      const newDecrementedIndex = Math.max(0, state.activeIndex - 1)

      return {
        ...state,
        ...getQuizStatus(state.quiz, newDecrementedIndex),
        activeIndex: newDecrementedIndex,
      }

    case START_QUIZ:
      return {
        ...state,
        hasStartedQuiz: true,
      }

    case RESET_QUIZ:
      return {
        ...state,
        ...getQuizStatus(state.quiz, 0),
        quiz: [],
        activeIndex: 0,
        answers: [],
      }

    case SET_QUIZ_ANSWER:
      const answers = [...state.answers]

      answers[action.index] = action.answer

      return {
        ...state,
        answers,
      }

    case SET_QUIZ_INDEX:
      return {
        ...state,
        ...getQuizStatus(state.quiz, action.index),
        activeIndex: action.index,
      }
  }

  return state
}
