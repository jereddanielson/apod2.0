module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "./public/bundle.js"
	},
	module: {
		loaders: [
			{
				exclude: /(node_modules|app-server.js|package.json)/,
				loader: "babel?presets[]=react,presets[]=es2015"
			}
		]
	}
}