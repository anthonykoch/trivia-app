// @flow

import { createSelector } from 'reselect'
import _ from 'lodash'
import cuid from 'cuid'

import type { QuizResultList, QuestionResult } from '../../types'
import type { AppState } from '../reducers'

export const getQuiz = (state: AppState) => state.trivia.quiz

export const getAnswers = (state: AppState) => state.trivia.answers

export const getActiveQuizIndex = (state: AppState) => state.trivia.activeIndex

export const getQuizResults: (state: AppState) => QuizResultList = createSelector(
  [getQuiz, getAnswers],
  (quiz, answers) => {
    const results = _.zip(quiz, answers).map(([question, answer]): QuestionResult => {
      return {
        id: cuid(),
        question,
        answer,
        isCorrect: question.correct_answer === answer,
      }
    })

    const correctAnswersAmount =
      results.reduce((amount, { isCorrect }) => {
        return isCorrect ? amount + 1 : amount
      }, 0)

    return {
      correctAnswersAmount,
      results,
    }
  }
)
