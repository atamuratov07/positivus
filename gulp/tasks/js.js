import webpack from 'webpack-stream'

export const js = () => {
	return $.gulp
		.src($.path.src.js, { sourcemaps: $.isDev })
		.pipe(
			webpack({
				mode: $.isBuild ? 'production' : 'development',
				output: {
					filename: 'app.min.js'
				}
			})
		) // сборка файлов WebPack
		.pipe($.gulp.dest($.path.build.js))
		.pipe($.plugins.browsersync.stream())
}
