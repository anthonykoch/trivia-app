// @flow

import React from 'react'
import styled from 'react-emotion'

import Button from '../components/Button'
import QuestionResultList from '../components/QuestionResultList'

import styles from '../styles/utilities'

import type { QuestionResult } from '../../types'

type Props = {
  correctAnswersAmount: number,
  results: QuestionResult[],
  onPlayAgain: Function,
}

export default function QuizResultScreen({
  correctAnswersAmount,
  results,
  onPlayAgain,
}: Props) {
  return (
    <React.Fragment>
      <p className={styles.text.center}>
        <span className={styles.display.block}>You scored</span>
        <Score>{correctAnswersAmount} / {results.length}</Score>
      </p>
      <QuestionResultList results={results} />
      <div className={styles.text.center}>
        <Button type="light" onClick={onPlayAgain}>Play again?</Button>
      </div>
    </React.Fragment>
  )
}

const Score = styled('span')`
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-left: 10px;
`
