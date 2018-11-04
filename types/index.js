// @flow

export type TriviaQuestion = {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export type BooleanTriviaAnswer = "True" | "False"

export type QuestionResult = {
  id: string,
  question: TriviaQuestion,
  answer: BooleanTriviaAnswer,
  isCorrect: boolean,
}

export type QuizResultList = {
  results: QuestionResult[],
  correctAnswersAmount: number,
}
export type TriviaQuizFetchResult = TriviaQuestion[]

export type TriviaReducerState = {|
  +quiz: TriviaQuestion[],
  +quizLength: number,
  +activeIndex: number,
  +answers: BooleanTriviaAnswer[],
  +hasStartedQuiz: boolean,
  +isFetchingQuiz: boolean,
  +hasFailedFetchingQuiz: boolean,
  +isQuizFinished: boolean,
|}
