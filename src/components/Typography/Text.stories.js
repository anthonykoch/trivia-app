
import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Text, { TextSize } from '~/components/Typography/Text'
import { provideDefaultTheme } from '~/.storybook/decorators'

storiesOf('Text', module)
  .addDecorator(provideDefaultTheme)
  .add('Size - Small', () => <Text type={TextSize.Small}>The quick brown fox</Text>)
  .add('Size - Medium', () => <Text type={TextSize.Medium}>The quick brown fox</Text>)
  .add('Size - Large', () => <Text type={TextSize.Large}>The quick brown fox</Text>)
