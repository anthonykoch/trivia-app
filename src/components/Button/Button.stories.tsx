
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withBackgrounds } from '@storybook/addon-backgrounds'

import Button, { ButtonGroup, ButtonStyle } from '~/components/Button/Button'
import { provideDefaultTheme } from '~/.storybook/decorators'

storiesOf('Button', module)
  .addDecorator(provideDefaultTheme)
  .addDecorator(withBackgrounds([
    { name: 'Grayscale 1', value: '#eeeeee', default: true },
  ]))
  .add('Button Type - "light"', () => <Button type={ButtonStyle.Light}>Light</Button>)
  .add('Button Group', () => (
    <ButtonGroup>
      <Button type={ButtonStyle.Light}>Light</Button>
      <Button type={ButtonStyle.Light}>Light</Button>
    </ButtonGroup>
  ))
  .add('Button Group - Centered', () => (
    <ButtonGroup center>
      <Button type={ButtonStyle.Light}>Light</Button>
      <Button type={ButtonStyle.Light}>Light</Button>
    </ButtonGroup>
  ))
  .add('Button Group - Conjoined', () => (
    <ButtonGroup conjoined>
      <Button type={ButtonStyle.Light}>Light</Button>
      <Button type={ButtonStyle.Light}>Light</Button>
    </ButtonGroup>
  ))
