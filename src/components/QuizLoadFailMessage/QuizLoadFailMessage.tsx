
import * as React from 'react'

import Button, { ButtonStyle } from '~/components/Button/Button'
import * as Typography from '~/components/Typography/Typography'

import styles from '~/styles/utilities'
import { css } from '~/styles/theme'
import { TextSize } from '~/components/Typography/Text'

export interface IProps {
  onTryAgain: (e: React.MouseEvent<HTMLElement>) => any,
}

export default function QuizLoadFailScreen({ onTryAgain }: IProps) {
  return (
    <div className={styles.text.center}>
      <Typography.Text
        type={TextSize.Large}
        className={css`
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        max-width: 700px;
        text-align: center;
      `}
      >
        {`Hmmm, sorry about this, but we can't seem to load the quiz`}
      </Typography.Text>
      <Button
        type={ButtonStyle.Light}
        onClick={onTryAgain}
      >
        Try again?
      </Button>
    </div>
  )
}
