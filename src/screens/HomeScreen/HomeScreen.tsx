
import * as React from 'react'

import Button, { ButtonStyle } from '~/components/Button/Button'
import { Page, Container } from '~/components/Layout/Layout'
import * as Typography from '~/components/Typography/Typography'

import { css } from '~/styles/theme'
import styles from '~/styles/utilities'
import { HeadingSize } from '~/components/Typography/Heading'
import { TextSize } from '~/components/Typography/Text'

export interface IProps {
  onBegin: () => any,
  children: React.ReactNode
}

export default class HomeScreen extends React.Component<IProps, {}> {
  public render() {
    return (
      <Page>
        <styles.spacing.Gutter className={styles.text.center}>
          <Typography.Heading
            type={HeadingSize.Large}
            className={css`
              margin-bottom: 40px;
            `}
          >
            Welcome to the Trivia Challenge!
          </Typography.Heading>
          <Container>
            <Typography.Text
              type={TextSize.Small}
              className={css`
                font-weight: bold;
              `}
            >
              You will be presented with 10 true or false questions.
            </Typography.Text>
            <div className={css`margin-bottom: 30px;`}>Can you score 100%?</div>
            <Button onClick={this.props.onBegin} type={ButtonStyle.Light}>Begin</Button>
          </Container>
        </styles.spacing.Gutter>
      </Page>
    )
  }
}
