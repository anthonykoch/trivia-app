import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'

import theme from '~/styles/theme'

export const provideDefaultTheme = (story: any) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
)
