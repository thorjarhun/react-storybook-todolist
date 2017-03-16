# React Storybook Implementation of [TodoMVC](http://todomvc.com)

### Usage
```
npm install
npm run storybook
```

## Implementation
The original objective of this project was to write a todo list app that utilized `@kadira/storybook` (aka `react-storybook`) with tests utilizing `jest`. Starting from a [TodoMVC Template](https://github.com/tastejs/todomvc-app-template), css considerations were taken care of. With a demo project like this, `react-scripts` seemed a convenient way to abstract away most of the boilerplate heavy configuration typical in a react project from the committed-codebase for purposes of brevity, with the added bonus of using `jest` under-the-hood for testing by default.
I wasn't sure what flavors of `react` work best with `react-storybook`. I chose to keep most state in `redux` and use mostly stateless components. More detail about this choice can be found [here](src/components/index.jsx).

## Tests
Tests are presently divided into two places. Some tests are littered about in files matching *.spec.js. These tests vary a bit in style, as shown in the difference between [these](src/reducers/items.spec.js) and [these](src/reducers/items2.spec.js). Run the tests using
```
npm run test
```
Tests on React components are written directly with their stories using `storybook-addon-specifications`. The tests run automatically when viewing the storybook. Run the storybook using
```
npm run storybook
```
Technically, there is a third method of testing, supported by `@kadira/storyshot`. This provides great value by showing when markup structure has changed! Run these tests using
```
npm run test-storybook
```

## Known issues/limitations
- `npm run test` does not currently run component-level tests. The difficulty comes from using react-scripts with `storybook-addon-specifications`, each of which use different embedded configurations for things like webpack, babel, and test runners. After some minor investigation, it seems that one solution for this may require ejecting from react-scripts, in addition to steps outlined in `storybook-addon-specifications` documentation. While this isn't a major obstacle and would be good to do in order to have finer control over various project configurations, it is somewhat tempting for a demo like this for purposes of brevity.
- Tests are incomplete. With this project's objective being to showcase code, the purpose of tests are more about demonstrating examples of tests, and less about providing 100% coverage or meeting the TodoMVC spec exactly, though these objectives may be accomplished in the future.
