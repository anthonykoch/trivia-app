
import * as React from 'react'

import styled, { css } from '~/styles/theme'

const Text1 = styled('div')`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.4;
`

const Text2 = styled('div')`
  font-size: 20px;
`

const Text3 = styled('div')`
  font-size: 16px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 18px;
    }
  `}
`

export enum TextSize {
  Small,
  Medium,
  Large,
}

const textByType = {
  [TextSize.Small]: Text3,
  [TextSize.Medium]: Text2,
  [TextSize.Large]: Text1,
}

export interface IProps extends React.HTMLAttributes<any> {
  type: TextSize,
}

export default function Text({ type, ...props }: IProps) {
  const Component = textByType[String(type)]

  return <Component {...props} />
}
