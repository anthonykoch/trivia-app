
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from '~/styles/theme'

export default function NotFound() {
  return (
    <Error404>
      <Error404Number>404</Error404Number>
      <Error404Divider />
      <Error404Message>
        Page not found. <Link to="/">Go back home?</Link>
      </Error404Message>
    </Error404>
  )
}

const Error404Number = styled('div')`
  font-size: 100px;
  font-weight: 700;
  line-height: 1.2;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.lg}px) {

    }
  `}
`

const Error404Divider = styled('div')`
  background-color: currentColor;
  display: none;
  height: 50px;
  margin-left: 50px;
  margin-right: 50px;
  width: 3px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.lg}px) {
      display: block;
    }
  `}
`

const Error404Message = styled('div')`
  font-size: 20px;
`

const Error404 = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
  text-align: center;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.lg}px) {
      flex-direction: row;
    }
  `}
`
