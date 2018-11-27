
import styled, { css } from '~/styles/theme'

export const mxauto = css`
  margin-left: auto;
  margin-right: auto;
`

export const Gutter = styled('div')`
  ${(props) => css`
    paddingLeft: ${props.theme.baseSpacing};
    paddingRight: ${props.theme.baseSpacing};
  `}
`
