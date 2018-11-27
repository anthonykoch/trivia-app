
import { connect } from 'react-redux'

import HomeScreen from '~/screens/HomeScreen/HomeScreen'

import { QuizType, QuizDifficulty } from '~/store/quiz/constants'
import * as quizActions from '~/store/quiz/actions'

export default connect(null, {
  onBegin: () => quizActions.startQuiz({
    amount: 10,
    difficulty: QuizDifficulty.Hard,
    type: QuizType.Boolean,
  }),
})(HomeScreen)
