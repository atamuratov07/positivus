import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

// Полезные инструменты
import cleanCss from 'gulp-clean-css' // Сжатие CSS файла
import webpcss from 'gulp-webpcss' // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer' // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries' // Группировка Медиа запросов

// ==============================

const sass = gulpSass(dartSass)

export const scss = () => {
	return (
		$.gulp
			.src($.path.src.scss, { sourcemaps: $.isDev })
			.pipe($.plugins.replace(/@img\//g, '../img/'))
			.pipe(
				sass({
					outputStyle: 'expanded'
				})
			)
			.pipe($.plugins.if($.isBuild, groupCssMediaQueries()))
			.pipe(
				$.plugins.if(
					$.isBuild,
					webpcss({
						webpClass: '.webp',
						noWebpClass: '.no-webp'
					})
				)
			)
			.pipe(
				$.plugins.if(
					$.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowserslist: ['last 3 versions'],
						cascade: true
					})
				)
			)
			// Если нужен не сжатый дубль CSS
			// .pipe($.gulp.dest($.path.build.css))
			.pipe($.plugins.if($.isBuild, cleanCss())) // Сжатие CSS файла
			.pipe(rename({ extname: '.min.css' }))
			.pipe($.gulp.dest($.path.build.css))
			.pipe($.plugins.browsersync.stream())
	)
}
