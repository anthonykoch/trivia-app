
import * as React from 'react'

import QuestionResult from '~/components/QuestionResult/QuestionResult'

import styled from '~/styles/theme'
import styles from '~/styles/utilities'

import { IQuizQuestionResult } from '~types'

export interface IProps {
  results: IQuizQuestionResult[],
}

export default function QuestionResultList({ results }: IProps) {
  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id}>
          <QuestionResult result={result} />
        </ListItem>
      ))}
    </List>
  )
}

const List = styled('ul')`
  ${styles.reset.list}
`

const ListItem = styled('li')`
  margin-bottom: 16px;
`
