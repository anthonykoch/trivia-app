
import * as React from 'react'
import styled, { css, cx } from '~/styles/theme'

import { entities } from '~/util'
import IconMinus from '~/components/Icon/Minus'
import IconPlus from '~/components/Icon/Plus'

import { IQuizQuestionResult } from '~types'

export interface IProps {
  result: IQuizQuestionResult,
}

export default function QuestionResult({ result }: IProps) {
  const icon =
    result.isCorrect
      ? <IconPlus className={cx(iconClass, iconPlusClass)} />
      : <IconMinus className={cx(iconClass, iconMinusClass)} />

  return (
    <Grid>
      <Column>{icon}</Column>
      <Column>
        <Question>{entities.decode(result.question.question)}</Question>
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
