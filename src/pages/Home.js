// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled, { css } from 'react-emotion'

import Button from '../components/Button'
import { Page, Container } from '../components/Layout'

import styles from '../styles/utilities'
import * as triviaActions from '../actions/trivia'

import type { Theme } from '../styles/theme'

type Props = {
  startQuiz: Function,
}

class Home extends React.Component<Props> {
  render() {
    const { startQuiz } = this.props

    return (
      <Page>
        <styles.spacing.Gutter className={styles.text.center}>
          <Header>Welcome to the Trivia Challenge!</Header>
          <Container>
            <Text>
              You will be presented with 10 true or false questions.
            </Text>
            <Question>Can you score 100%?</Question>
            <Button onClick={startQuiz} type="light">Begin</Button>
          </Container>
        </styles.spacing.Gutter>
      </Page>
    )
  }
}

const Header = styled('div')`
  font-size: 40px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 40px;
  text-align: center;

  ${({ theme }: { theme: Theme }) => css`
    font-family: ${theme.font2};

    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 60px;
      line-height: 1.3;
    }
  `}
`

const Question = styled('div')`
  margin-bottom: 30px;
`

const Text = styled('p')`
  font-size: 20px;
  font-weight: bold;
`

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startQuiz: triviaActions.startQuiz,
  }, dispatch)
}

// $FlowFixMe
export default connect(null, mapDispatchToProps)(Home)
