const path = require('path')
const PugPlugin = require('pug-plugin')

module.exports = (env) => {
	return {
		mode: env.mode,
		entry: {
			index: './src/index.pug',
		},
		output: {
			path: path.join(__dirname, 'dist/'),
			publicPath: '/',
			filename: 'assets/js/[name].[contenthash:8].js',
			clean: true,
		},
		plugins: [
			new PugPlugin({
				pretty: true,
				//☝🏽 Format HTML (only in dev mode)
				css: {
					filename: 'assets/css/[name].[contenthash:8].css',
				},
			}),
		],
		/* /plugins */
		module: {
			rules: [
				{
					test: /\.pug$/,
					loader: PugPlugin.loader,
					options: {
						data: require('./data.json'),
					},
				},
				{
					test: /\.(css|sass|scss)$/,
					use: ['css-loader', 'sass-loader'],
					//☝🏽 Load Sass files
				},
				{
					// To use images on pug files:
					test: /\.(png|jpg|jpeg|ico)/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/img/[name].[hash:8][ext]',
					},
				},
				{
					// To use fonts on pug files:
					test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'assets/fonts/[name][ext][query]',
					},
				},
			],
			/* /rules */
		},
		/* /module */
		devServer: {
			watchFiles: {
				paths: ['src/**/*.*'],
				//☝🏽 Enables HMR in these folders
				options: {
					usePolling: true,
				},
			},
			port: 9000,
		},
	}
}
