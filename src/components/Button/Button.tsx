
import * as React from 'react'
import styled, { css } from '~/styles/theme'

import styles from '~/styles/utilities'

interface IButtonWithIconProps {
  icon: React.ReactNode
  children: React.ReactNode
}

export interface IProps extends React.HTMLAttributes<any> {
  type?: ButtonStyle
}

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
  user-select: none;

  &:hover,
  &:active {
    background-color: #333333;
    color: white;
  }

  ${({ theme }) => css`
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

export interface IButtonGroupProps {
  conjoined?: boolean
  center?: boolean
}

// TODO: Replace with a flex grid component
export const ButtonGroup = styled('span')<IButtonGroupProps>`
  display: flex;

  ${(props) => css`
    ${props.center && css`
      justify-content: center;
    `}

    & > :not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    & > :first-child {
      border-radius: 4px 0 0 4px;
    }

    & > :last-child {
      border-radius: 0 4px 4px 0;
    }
  `}
`

export const ButtonWithIcon = ({
    icon,
    children,
    type,
  ...props // tslint:disable-line trailing-comma
  }: IProps & IButtonWithIconProps & React.HTMLAttributes<any>,
) => {
  return (
    <Button {...props}>
      <ButtonIconGrid>
        <span>{icon}</span>
        <span style={{ display: 'inline-block' }}>{children}</span>
      </ButtonIconGrid>
    </Button>
  )
}

export enum ButtonStyle {
  Default,
  Light,
}

export const buttonTypes = {
  [ButtonStyle.Default]: ButtonDefault,
  [ButtonStyle.Light]: ButtonLight,
}

export default function Button({
  type = ButtonStyle.Default,
  ...props // tslint:disable-line trailing-comma
}: IProps) {
  const Action = buttonTypes[type]

  return <Action {...props} />
}
