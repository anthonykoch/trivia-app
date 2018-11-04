// @flow

import React, { type Node } from 'react'
import styled, { css } from 'react-emotion'

import styles from '../styles/utilities'

import type { Theme } from '../styles/theme'

const ButtonDefault = styled('button')`
  ${styles.reset.button}
`

const ButtonLight = styled('button')`
  ${styles.reset.button}
  background-color: white;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  transition: background-color 200ms, color 200ms;

  &:hover,
  &:active {
    background-color: #333333;
    color: white;
  }

  ${({ theme }: { theme: Theme }) => css`
    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 14px;
      padding: 20px 60px;
    }
  `}
`

export const ButtonIconGrid = styled('span')`
  align-items: center;
  display: flex;
`

export const ButtonGroup = styled('span')`
  display: flex;
  justify-content: center;
`

export const ConjoinedButtonGroup = styled('span')`
  display: flex;
  justify-content: center;

  & > :not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  & > :first-child {
    border-radius: 4px 0 0 4px;
  }

  & > :last-child {
    border-radius: 0 4px 4px 0;
  }
`

type ButtonWithIconProps = {
  icon: Node,
  children: Node,
}

export const ButtonWithIcon = ({ icon, children, ...props }: ButtonWithIconProps) => {
  return (
    <Button {...props}>
      <ButtonIconGrid>
        <span>{icon}</span>
        <span style={{ display: 'inline-block' }}>{children}</span>
      </ButtonIconGrid>
    </Button>
  )
}

const buttonTypes = {
  default: ButtonDefault,
  light: ButtonLight,
}

type Props = {
  type?: $Keys<typeof buttonTypes>
}

export default function Button({
  type='default',
  ...props
}: Props) {
  const Button = buttonTypes[type]

  return <Button {...props} />
}
