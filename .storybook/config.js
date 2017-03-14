import { configure } from '@kadira/storybook';
import 'todomvc-app-css/index.css';

const req = require.context('../src', true, /stories\.js$/);

function loadStories() {
	req.keys().forEach(req)
}

configure(loadStories, module);
