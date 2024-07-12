import { deleteAsync } from 'del'
import zipPlugin from 'gulp-zip'

export const zip = () => {
	deleteAsync(`./${$.path.rootFolder}.zip`)
	return $.gulp
		.src(`${$.path.buildFolder}/**/*.*`)
		.pipe(zipPlugin(`${$.path.rootFolder}.zip`))
		.pipe($.gulp.dest('./'))
}
