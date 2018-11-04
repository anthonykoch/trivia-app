// @flow

import { css } from 'react-emotion'

export const button = css`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  outline: 0;
  padding: 14px 24px;

  &:link,
  &:visited {
    text-decoration: none;
    color: #333333;
  }
`

export const list = css`
  list-style-type: none;
  padding-left: 0;
`
