
import * as React from 'react'
import styled, { css } from '~/styles/theme'

const Heading1 = styled('div')`
  font-size: 40px;
  font-weight: bold;
  line-height: 1.3;

  ${({ theme }) => css`
    font-family: ${theme.font2};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 52px;
      line-height: 1.2;
      max-width: 100%;
    }

    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 70px;
      line-height: 1.2;
      max-width: 100%;
    }
  `}
`

export enum HeadingSize {
  Large,
}

export const headingsByType = {
  [HeadingSize.Large]: Heading1,
}

export interface IProps extends React.HTMLAttributes<any> {
  type: HeadingSize.Large
}

export default function Heading({ type, ...props }: IProps) {
  const Component = headingsByType[String(type)]

  return <Component {...props} />
}
