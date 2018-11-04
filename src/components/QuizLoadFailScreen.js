// @flow

import React from 'react'
import styled from 'react-emotion'

import Button from '../components/Button'

import styles from '../styles/utilities'

type Props = {
  onTryAgain: Function,
}

export default function QuizLoadFailScreen({ onTryAgain }: Props) {
  return (
    <div className={styles.text.center}>
      <SorryMessage>{`Hmmm, sorry about this, but we can't seem to load the quiz`}</SorryMessage>
      <Button
        type="light"
        onClick={onTryAgain}
      >
        Try again?
      </Button>
    </div>
  )
}

const SorryMessage = styled('div')`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  text-align: center;
`
