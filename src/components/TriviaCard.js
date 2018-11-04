// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '../styles/utilities'

import type { TriviaQuestion as TypeTriviaQuestion } from '../../types'
import type { Theme } from '../styles/theme'

type Props = {
  question: TypeTriviaQuestion,
  quizLength: number,
  activeIndexDisplay: number,
}

export default function TriviaCard({
  question,
  activeIndexDisplay,
  quizLength,
}: Props) {
  return (
    <Card>
      <TriviaStatus className={styles.spacing.mxauto}>
        {activeIndexDisplay} / {quizLength}
      </TriviaStatus>
      <TriviaCategory>{question.category}</TriviaCategory>
      <TriviaQuestion dangerouslySetInnerHTML={{ __html: question.question }}></TriviaQuestion>
    </Card>
  )
}

const Card = styled('div')`

`

const TriviaCategory = styled('div')`
  font-size: 40px;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;

  ${({ theme }: { theme: Theme }) => css`
    font-family: ${theme.font2};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 52px;
      line-height: 1.2;
      max-width: 100%;
    }

    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 70px;
      line-height: 1.2;
      max-width: 100%;
    }
  `}
`

const TriviaQuestion = styled('div')`
  border-top: 2px solid #ccc;
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  padding-top: 20px;

  ${({ theme }: { theme: Theme }) => css`
    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 18px;
    }
  `}
`

const TriviaStatus = styled('div')`
  border: 2px solid currentColor;
  display: inline-block;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 6px 20px;
`
