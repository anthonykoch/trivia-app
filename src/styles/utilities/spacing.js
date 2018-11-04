// @flow

import React, { type Node } from 'react'
import styled, { css } from 'react-emotion'
import { withTheme } from 'emotion-theming'

import type { Theme } from '../theme'

export const mxauto = css`
  margin-left: auto;
  margin-right: auto;
`

export const Gutter = withTheme(({
  theme,
  /**
   * The tag element to render
   */
  is='div',
  children,
  ...props
}: {
  theme: Theme,
  is: string,
  children: Node,
}) => {
  const style = {
    paddingLeft: theme.baseSpacing,
    paddingRight: theme.baseSpacing,
  }

  return React.createElement(is, { ...props, style }, children)
})

