import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
	return $.gulp
		.src($.path.src.images)
		.pipe($.plugins.newer($.path.build.images))
		.pipe($.plugins.if($.isBuild, webp()))
		.pipe($.plugins.if($.isBuild, $.gulp.dest($.path.build.images))) // Вставка в конечную папку
		.pipe($.plugins.if($.isBuild, $.gulp.src($.path.src.images)))
		.pipe($.plugins.if($.isBuild, $.plugins.newer($.path.build.images)))
		.pipe(
			$.plugins.if(
				$.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		) // Сжатие картинок
		.pipe($.gulp.dest($.path.build.images)) // Вставка в конечную папку
		.pipe($.gulp.src($.path.src.svg))
		.pipe($.gulp.dest($.path.build.images)) // Вставка в конечную папку
		.pipe($.plugins.browsersync.stream()) // Авто-Обнавление
}
