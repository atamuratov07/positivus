import fileInclude from 'gulp-file-include'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'

export const html = () => {
	return $.gulp
		.src($.path.src.html)
		.pipe(fileInclude()) // Объединение файлов
		.pipe($.plugins.replace(/@img\//g, 'img/')) // Корректировка img
		.pipe($.plugins.if($.isBuild, webpHtmlNosvg())) // Обтимизация картинок
		.pipe($.gulp.dest($.path.build.html)) // Вставка в конечную папку
		.pipe($.plugins.browsersync.stream()) // Авто-Обнавление
}
