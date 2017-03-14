const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) =>
	Object.assign({}, genDefaultConfig(config, env),
		{
			externals: {
				'jsdom': 'window',
				'cheerio': 'window',
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': 'window',
				'react/addons': true
			}
		}
	);
