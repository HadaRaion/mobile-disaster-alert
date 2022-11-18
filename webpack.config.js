const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = [];
let pages = fs.readdirSync('./src');
pages.forEach(page => {
	if (page.endsWith('.html')) {
		htmlPageNames.push(page.split('.html')[0]);
	}
});
let multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/${name}.html`,
		filename: `${name}.html`,
		minify: false,
	});
});

const plugins = [
	// 최종본 때 활성화
	new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
	new MiniCssExtractPlugin(),
].concat(multipleHtmlPlugins);

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserslist';
}

module.exports = {
	mode: mode,
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: '[name].[contenthash].bundle.js',
		// assetModuleFilename: 'images/[name].[ext]',
		assetModuleFilename: pathData => {
			const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
			return `${filepath}/[name].[hash][ext][query]`;
		},
		clean: true,
	},
	plugins: plugins,
	target: target,
	devtool: 'source-map',
	devServer: {
		static: path.resolve('./docs'),
		port: 5001,
		hot: true,
	},

	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						// This is required for asset imports in CSS, such as url()
						options: { publicPath: '' },
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(webp|png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true,
						attrs: ['img:src', 'source:srcset'],
					},
				},
			},
		],
	},
};
