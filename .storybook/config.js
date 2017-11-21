import { configure } from '@storybook/react';

const requireContext = require.context('../source', true, /\.story\.js$/)

function loadStories() {
  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
