
import React from 'react'
import { injectGlobal } from 'emotion'
import { configure, addDecorator } from '@storybook/react';
import '@storybook/addon-backgrounds/register';
import 'normalize.css'
import theme from '~/styles/theme'

import { globalStyle, GlobalContainer } from '~/styles/global-style'

injectGlobal(globalStyle)

addDecorator((storyFn) =>
  <GlobalContainer theme={theme}>
    {storyFn()}
  </GlobalContainer>
)

// automatically import all files ending in *.stories.js
// $FlowFixMe
const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
