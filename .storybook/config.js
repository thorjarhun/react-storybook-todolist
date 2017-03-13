import { configure } from '@kadira/storybook';

const loadStories = () => {
	require('../src/stories/index.js');
};

configure(loadStories, module);
