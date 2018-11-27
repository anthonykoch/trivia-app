
import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Heading, { HeadingSize } from '~/components/Typography/Heading'
import { provideDefaultTheme } from '~/.storybook/decorators'

storiesOf('Heading', module)
  .addDecorator(provideDefaultTheme)
  .add('Size - Large', () => <Heading type={HeadingSize.Large}>The quick brown fox</Heading>)
