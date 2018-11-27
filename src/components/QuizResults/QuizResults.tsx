
import * as React from 'react'

import Button, { ButtonStyle } from '~/components/Button/Button'
import QuestionResultList from '~/components/QuestionResultList/QuestionResultList'

import styled from '~/styles/theme'
import styles from '~/styles/utilities'

import { IQuizResults } from '~types'

export interface IProps {
  results: IQuizResults,
  onPlayAgain: (e: React.MouseEvent<HTMLElement>) => any,
}

export default function QuizResultScreen({ results, onPlayAgain }: IProps) {
  return (
    <React.Fragment>
      <p className={styles.text.center}>
        <span className={styles.display.block}>You scored</span>
        <Score>{results.correctAnswersAmount} / {results.items.length}</Score>
      </p>
      <QuestionResultList results={results.items} />
      <div className={styles.text.center}>
        <Button type={ButtonStyle.Light} onClick={onPlayAgain}>Play again?</Button>
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
