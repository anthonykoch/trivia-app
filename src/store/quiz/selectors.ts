import cuid from 'cuid'
import { zip } from 'lodash'

import {
  IQuizResults,
  IQuizQuestionResult,
  IQuizQuestion,
  IQuizAnswer,
} from '~types'

export const getQuizResults = (
  questions: IQuizQuestion[],
  answers: IQuizAnswer[],
): IQuizResults => {
  const items =
    zip(questions, answers)
    .map(([question, answer]: [IQuizQuestion, IQuizAnswer | undefined]): IQuizQuestionResult => {
      return {
        id: cuid(),
        question,
        answer,
        isCorrect: question.correct_answer === answer,
      }
    })

  const correctAnswersAmount =
    items.reduce((amount, { isCorrect }) => {
      return isCorrect ? amount + 1 : amount
    }, 0)

  return {
    correctAnswersAmount,
    items,
  }
}
