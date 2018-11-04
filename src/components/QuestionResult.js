// @flow

import React from 'react'
import styled, { css, cx } from 'react-emotion'

import IconMinus from './Icon/Minus'
import IconPlus from './Icon/Plus'

import type { QuestionResult as TypeQuestionResult } from '../../types'

type Props = {
  result: TypeQuestionResult,
}

export default function QuestionResult({ result }: Props) {
  const icon =
    result.isCorrect
      ? <IconPlus className={cx(iconClass, iconPlusClass)} />
      : <IconMinus className={cx(iconClass, iconMinusClass)} />

  return (
    <Grid>
      <Column>{icon}</Column>
      <Column>
        <Question dangerouslySetInnerHTML={{ __html: result.question.question }}></Question>
      </Column>
    </Grid>
  )
}

const iconClass = css`
  display: block;
  margin-right: 20px;
  margin-top: 3px;
  min-width: 18px;
  width: 16px;
`

const iconPlusClass = css`
  fill: #6cba43;
`

const iconMinusClass = css`
  fill: red;
`

const Grid = styled('div')`
  align-items: flex-start;
  display: flex;
`

const Column = styled('div')``

const Question = styled('p')`
  font-size: 16px;
`
