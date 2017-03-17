import { configure } from '@kadira/storybook';
import 'todomvc-app-css/index.css';

const loadStories = () => {
  require('../src/components/stories/index.js');
};

configure(loadStories, module);
