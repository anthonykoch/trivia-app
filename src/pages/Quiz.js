// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Redirect,
} from 'react-router-dom'

import styled, { css } from 'react-emotion'

import Button, {
  ButtonWithIcon,
  ButtonGroup,
  ConjoinedButtonGroup,
} from '../components/Button'

import TriviaCard from '../components/TriviaCard'
import { Page, Container } from '../components/Layout'
import QuizResultScreen from '../components/QuizResultScreen'
import QuizLoadFailScreen from '../components/QuizLoadFailScreen'
import ArrowLeft from '../components/Icon/ArrowLeft'

import styles from '../styles/utilities'
import { getQuizResults } from '../selectors'
import * as triviaActions from '../actions/trivia'

import type { QuizResultList, TriviaQuestion as TypeTriviaQuestion } from '../../types'
import type { AppState } from '../reducers'

type MappedStateProps = {
  ...$Exact<QuizResultList>,
  activeIndexDisplay: number,
  isFetchingQuiz: boolean,
  hasFailedFetchingQuiz: boolean,
  hasStartedQuiz: boolean,
  activeIndex: number,
  quizLength: number,
  question: TypeTriviaQuestion,
  isQuizFinished: boolean,
}

type MappedDispatchProps = {
  startQuiz: typeof triviaActions.startQuiz,
  setQuizIndex: typeof triviaActions.setQuizIndex,
  setQuizAnswer: typeof triviaActions.setQuizAnswer,
  incrementQuizIndex: typeof triviaActions.incrementQuizIndex,
  decrementQuizIndex: typeof triviaActions.decrementQuizIndex,
}

type OwnProps = {
}

type Props = OwnProps & MappedDispatchProps & MappedStateProps

class Quiz extends React.Component<Props> {
  answerFalse: (bool: 'False') => void
  answerTrue: (bool: 'True') => void

  constructor() {
    super()

    this.answerTrue = this.onAnswer.bind(this, 'True')
    this.answerFalse = this.onAnswer.bind(this, 'False')
  }

  onAnswer(bool) {
    this.props.setQuizAnswer(this.props.activeIndex, bool)
    this.props.incrementQuizIndex()
  }

  renderTrivia() {
    const {
      question,
      activeIndexDisplay,
      quizLength,
      activeIndex,
    } = this.props

    const backButton =
      activeIndex > 0
        ? <BackButton onClick={this.props.decrementQuizIndex} />
        : null

    return (
      <div className={styles.text.center}>
        <TriviaCardContainer>
          <TriviaCard
            activeIndexDisplay={activeIndexDisplay}
            quizLength={quizLength}
            question={question}
          />
        </TriviaCardContainer>
        <ButtonGroup>
          <ConjoinedButtonGroup>
            <Button type="light" onClick={this.answerTrue}>True</Button>
            <Button type="light" onClick={this.answerFalse}>False</Button>
          </ConjoinedButtonGroup>
          {backButton}
        </ButtonGroup>
      </div>
    )
  }

  render() {
    const {
      correctAnswersAmount,
      results,
      startQuiz,
      isFetchingQuiz,
      hasStartedQuiz,
      hasFailedFetchingQuiz,
      isQuizFinished,
    } = this.props

    if (!hasStartedQuiz) {
      return <Redirect to="/" />
    }

    let content = null

    if (isFetchingQuiz) {
      content = <LoadingIndicator />
    } else if (hasFailedFetchingQuiz) {
      content = <QuizLoadFailScreen onTryAgain={startQuiz} />
    } else if (isQuizFinished) {
      content = <QuizResultScreen
        onPlayAgain={startQuiz}
        correctAnswersAmount={correctAnswersAmount}
        results={results}
      />
    } else {
      content = this.renderTrivia()
    }

    return (
      <Page>
        <styles.spacing.Gutter>
          <Container>
            {content}
          </Container>
        </styles.spacing.Gutter>
      </Page>
    )
  }
}

const LoadingIndicator = () => {
  return <div className={styles.text.center}>Loading quiz...</div>
}

const BackButton = (props: {}) => {
  return (
    <ButtonWithIcon
      {...props}
      type="default"
      icon={<ArrowLeft className={arrowLeftClass} />}
    >
      Previous
    </ButtonWithIcon>
  )
}

const arrowLeftClass = css`
  display: block;
  width: 30px;
`

const TriviaCardContainer = styled('div')`
  min-height: 350px;
`

function mapStateToProps(state: AppState, props: OwnProps): MappedStateProps {
  const {
    hasStartedQuiz,
    activeIndex,
    isFetchingQuiz,
    hasFailedFetchingQuiz,
    isQuizFinished,
    quiz,
  } = state.trivia

  const { results, correctAnswersAmount } = getQuizResults(state)

  return {
    activeIndexDisplay: activeIndex + 1,
    results,
    correctAnswersAmount,
    activeIndex,
    hasStartedQuiz,
    isFetchingQuiz,
    hasFailedFetchingQuiz,
    isQuizFinished,
    quizLength: quiz.length,
    question: quiz[activeIndex],
  }
}

function mapDispatchToProps(dispatch: *): MappedDispatchProps {
  return bindActionCreators({
    startQuiz: triviaActions.startQuiz,
    setQuizIndex: triviaActions.setQuizIndex,
    incrementQuizIndex: triviaActions.incrementQuizIndex,
    decrementQuizIndex: triviaActions.decrementQuizIndex,
    setQuizAnswer: triviaActions.setQuizAnswer,
  }, dispatch)
}

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
