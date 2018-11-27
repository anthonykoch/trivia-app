
import axios from '~/api/axios'

import { QuizDifficulty, QuizType } from '~/store/quiz/constants'

export function getQuestions({
  amount,
  difficulty,
  type,
}: {
    amount: number,
    difficulty: QuizDifficulty,
    type: QuizType,
  }) {
  const url =
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty.toLowerCase()}&type=${type.toLowerCase()}`

  return axios.get(url)
}
