import replace from 'gulp-replace' // Поиск и замена
import browsersync from 'browser-sync' // Локальный сервер
import newer from 'gulp-newer' // Проверка обновления
import ifPlugin from 'gulp-if' // Условное ветвление

export const plugins = {
	replace: replace,
	newer: newer,
	browsersync: browsersync,
	if: ifPlugin
}
