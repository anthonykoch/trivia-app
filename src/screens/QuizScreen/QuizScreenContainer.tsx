
import { connect } from 'react-redux'
import _ from 'lodash'

import QuizScreen, { IMappedStateProps } from '~/screens/QuizScreen/QuizScreen'
import * as quizActions from '~/store/quiz/actions'
import { getQuizResults } from '~/store/quiz/selectors'
import { IAppState } from '~/store'
import { createLoadingResource, createLoadFailedResource, createNonRequestedResource } from '~/util'
import { getRouterState } from '~/store/util'
import { getLoadableResource } from '~/store/fetch/util'

function mapStateToProps(state: IAppState): IMappedStateProps {
  const { quizMeta = { fetchId: null, quizId: null } } = getRouterState(state)

  const loadableQuiz = getLoadableResource(
    state.quiz.quizzes.byId[String(quizMeta.quizId)],
    state.quiz.fetches.byId[String(quizMeta.fetchId)],
  )

  const props: IMappedStateProps = {
    quizResource: createNonRequestedResource(),
    redirectTo: '/',
  }

  if (loadableQuiz.isLoaded) {
    const { data: quiz } = loadableQuiz
    const progress = state.quiz.progresses.byId[quiz.progress.id]
    const results = getQuizResults(quiz.questions, progress.answers)

    props.quizResource = {
      ...loadableQuiz,
      data: {
        isQuizFinished: quiz.questions.length === progress.answers.length,
        quiz,
        progress,
        results,
      },
    }
  } else if (loadableQuiz.isFailed) {
    props.quizResource = createLoadFailedResource(loadableQuiz)
  } else if (loadableQuiz.isLoading) {
    props.quizResource = createLoadingResource(loadableQuiz)
  }

  return props
}

export default connect(mapStateToProps, {
  startQuiz: quizActions.startQuiz,
  setQuizProgressIndex: quizActions.setQuizProgressIndex,
  incrementQuizProgressIndex: quizActions.incrementQuizProgressIndex,
  decrementQuizProgressIndex: quizActions.decrementQuizProgressIndex,
  setQuizAnswer: quizActions.setQuizAnswer,
})(QuizScreen)
