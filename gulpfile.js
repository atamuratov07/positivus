// Основной модуль
import gulp from 'gulp'
// Импоррт путей
import { path } from './gulp/config/path.js'
// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js'

// Передаём значения в глобальную переменную
global.$ = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	gulp: gulp,
	path: path,
	plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js'
import {
	copyFonts,
	fontsStyle,
	otfToTtf,
	ttfToWoff,
} from './gulp/tasks/fonts.js'
import { html } from './gulp/tasks/html.js'
import { images } from './gulp/tasks/images.js'
import { js } from './gulp/tasks/js.js'
import { reset } from './gulp/tasks/reset.js'
import { scss } from './gulp/tasks/scss.js'
import { server } from './gulp/tasks/server.js'
import { zip } from './gulp/tasks/zip.js'

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
}

// Последовательная обработка шрифтов
const fonts = gulp.series(copyFonts, otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = gulp.series(
	fonts,
	gulp.parallel(copy, html, scss, js, images)
)

// Построение сценариев выполнения задач
const build = gulp.series(reset, mainTasks, zip)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

// Выполнение сценария по умолчанию
gulp.task('default', dev)
gulp.task('build', build)
