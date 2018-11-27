
import styled, { css } from '~/styles/theme'

export const GlobalContainer = styled('div')`
  ${({ theme }) => css`
    font-family: ${theme.font1};
  `}
`

export const globalStyle = `
*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-size: 1rem;
  line-height: 1.7;
  min-height: 100vh;
  text-rendering: geometricPrecision;
  width: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
