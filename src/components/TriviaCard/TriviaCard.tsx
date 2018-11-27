
import * as React from 'react'

import * as Typography from '~/components/Typography/Typography'
import { HeadingSize } from '~/components/Typography/Heading'
import { TextSize } from '~/components/Typography/Text'

import { entities } from '~/util'
import styled, { css, cx } from '~/styles/theme' // eslint-disable-line no-unused-vars
import styles from '~/styles/utilities'
import { IQuizQuestion } from '~types'

export interface IProps {
  question: IQuizQuestion
  quizLength: number
  activeIndexDisplay: number
}

export default function TriviaCard({
  question,
  activeIndexDisplay,
  quizLength,
}: IProps) {
  return (
    <div>
      <TriviaStatus className={styles.spacing.mxauto}>
        {activeIndexDisplay} / {quizLength}
      </TriviaStatus>
      <Typography.Heading
        type={HeadingSize.Large}
        className={cx(css`
          font-weight: bold;
          margin-bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          max-width: 600px;
        `)}
      >
        {question.category}
      </Typography.Heading>
      <Typography.Text
        type={TextSize.Small}
        className={css`
          border-top: 2px solid #ccc;
          margin-bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          max-width: 700px;
          padding-top: 20px;
        `}
      >
        {entities.decode(question.question)}
      </Typography.Text>
    </div>
  )
}

const TriviaStatus = styled('div')`
  border: 2px solid currentColor;
  display: inline-block;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 6px 20px;
`
