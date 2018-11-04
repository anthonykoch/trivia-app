// @flow

import React from 'react'
import styled from 'react-emotion'

import QuestionResult from './QuestionResult'

import styles from '../styles/utilities'

import type { QuestionResult as TypeQuestionResult } from '../../types'

type Props = {
  results: TypeQuestionResult[],
}

export default function QuestionResultList({ results }: Props) {
  return (
    <List>
      {results.map((result) =>
        <ListItem key={result.id}>
          <QuestionResult result={result} />
        </ListItem>
      )}
    </List>
  )
}

const List = styled('ul')`
  ${styles.reset.list}
`

const ListItem = styled('li')`
  margin-bottom: 16px;
`
