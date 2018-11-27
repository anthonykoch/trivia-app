
import styled, { CreateStyled } from 'react-emotion'

const backupFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const font1 = `Poppins, ${backupFontFamily}`
const font2 = `Playfair Display, ${backupFontFamily}`

const baseSpacing = 20

const breakpoints = {
  xs: 0,
  sm: 360,
  md: 600,
  lg: 960,
  xl: 1200,
  xxl: 1441,
}

export * from 'react-emotion'

export const theme = {
  font1,
  font2,
  baseSpacing,
  breakpoints,
}

export type Theme = typeof theme

export default styled as CreateStyled<Theme>
