
import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Button, {
  ButtonWithIcon,
  ButtonGroup,
  ButtonStyle,
} from '~/components/Button/Button'

import TriviaCard from '~/components/TriviaCard/TriviaCard'
import { Page, Container } from '~/components/Layout/Layout'
import QuizResultScreen from '~/components/QuizResults/QuizResults'
import QuizLoadFailMessage from '~/components/QuizLoadFailMessage/QuizLoadFailMessage'
import ArrowLeft from '~/components/Icon/ArrowLeft'

import { IQuizQuestion, IQuizProgress, ILoadableResource, IQuizResults } from '~types'
import styled, { css } from '~/styles/theme'
import styles from '~/styles/utilities'
import * as quizActions from '~/store/quiz/actions'
import { QuizType, QuizDifficulty } from '~/store/quiz/constants'
import { IStoredQuiz } from '~/store/quiz/reducer'

export interface IMappedStateProps {
  redirectTo: string,
  quizResource: ILoadableResource<{
    isQuizFinished: boolean,
    progress: IQuizProgress,
    quiz: IStoredQuiz,
    results: IQuizResults,
  }, quizActions.IFetchQuizMeta>
}

export interface IMappedDispatchProps {
  startQuiz: typeof quizActions.startQuiz
  setQuizProgressIndex: typeof quizActions.setQuizProgressIndex
  setQuizAnswer: typeof quizActions.setQuizAnswer
  incrementQuizProgressIndex: typeof quizActions.incrementQuizProgressIndex
  decrementQuizProgressIndex: typeof quizActions.decrementQuizProgressIndex
}

export interface IProps extends IMappedDispatchProps, IMappedStateProps {}

export default class QuizScreen extends React.Component<IProps, {}> {
  private answerTrue = (e: React.MouseEvent<any>) => this.onAnswer('True', e)

  private answerFalse = (e: React.MouseEvent<any>) => this.onAnswer('False', e)

  private onAnswer(answer: string, e: React.MouseEvent<any>) {
    if (e.nativeEvent.which === 1 && this.props.quizResource && this.props.quizResource.isLoaded) {
      const { data: { quiz, progress } } = this.props.quizResource

      this.props.setQuizAnswer(progress, progress.activeIndex, answer)
      this.props.incrementQuizProgressIndex(quiz.progress, quiz.questions.length)
    }
  }

  private playAgain = (e: React.MouseEvent<HTMLElement>) => {
    if (e.nativeEvent.which === 1) {
      this.props.startQuiz({
        difficulty: QuizDifficulty.Hard,
        type: QuizType.Boolean,
        amount: 10,
      })
    }
  }

  private onBackClick = (e: React.MouseEvent<HTMLElement>) => {
    const { quizResource } = this.props

    if (e.nativeEvent.which === 1 && quizResource && quizResource.data) {
      this.props.decrementQuizProgressIndex(quizResource.data.progress)
    }
  }

  public renderTrivia({
    activeIndex,
    questions,
  }: {
    activeIndex: number,
    questions: IQuizQuestion[],
  }) {
    const activeQuestion = questions[activeIndex]

    const backButton =
      activeIndex > 0
        ? <BackButton onClick={this.onBackClick} />
        : null

    return (
      <div className={styles.text.center}>
        <TriviaCardContainer>
          <TriviaCard
            activeIndexDisplay={activeIndex + 1}
            quizLength={questions.length}
            question={activeQuestion}
          />
        </TriviaCardContainer>
        <ButtonGroup center>
          <ButtonGroup conjoined>
            <Button type={ButtonStyle.Light} onClick={this.answerTrue}>True</Button>
            <Button type={ButtonStyle.Light} onClick={this.answerFalse}>False</Button>
          </ButtonGroup>
          {backButton}
        </ButtonGroup>
      </div>
    )
  }

  public render() {
    const { quizResource, redirectTo } = this.props

    let content

    if (!quizResource.isRequested) {
      return <Redirect to={redirectTo} />
    } else if (quizResource.isLoading) {
      content = <LoadingIndicator />
    } else if (quizResource.isFailed) {
      content = <QuizLoadFailMessage onTryAgain={this.playAgain} />
    } else if (quizResource.data.isQuizFinished) {
      content = (
        <QuizResultScreen
          onPlayAgain={this.playAgain}
          results={quizResource.data.results}
        />
      )
    } else {
      const { quiz, progress } = quizResource.data

      content = this.renderTrivia({
        questions: quiz.questions,
        activeIndex: progress.activeIndex,
      })
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

const BackButton = (props: {} & React.HTMLAttributes<any>) => {
  return (
    <ButtonWithIcon
      {...props}
      type={ButtonStyle.Default}
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
