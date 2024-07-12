import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const copyFonts = () => {
	return $.gulp
		.src(`${$.path.srcFolder}/fonts/*.woff2`)
		.pipe($.gulp.dest($.path.build.fonts))
}

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return $.gulp
		.src(`${$.path.srcFolder}/fonts/*.otf`)
		.pipe(fonter({ formats: ['ttf'] })) // Конвертируем в .ttf
		.pipe($.gulp.dest(`${$.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	return $.gulp
		.src(`${$.path.srcFolder}/fonts/*.ttf`)
		.pipe(fonter({ formats: ['woff'] }))
		.pipe($.gulp.dest(`${$.path.build.fonts}`))
		.pipe($.gulp.src(`${$.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe($.gulp.dest(`${$.path.build.fonts}`))
}

export const fontsStyle = (done) => {
	// Файл стилей поключения шрифтов
	let fontsFile = `${$.path.srcFolder}/scss/fonts.scss`
	// Проверяем существует ли файл шрифтов
	fs.readdir($.path.build.fonts, (err, fontsFiles) => {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей поключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нетб создаём его
				fs.writeFile(fontsFile, '', cb)
				let newFileOnly
				for (let i = 0; i < fontsFiles.length; i++) {
					let fontFileName = fontsFiles[i].split('.')[0]
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0]
							? fontFileName.split('-')[0]
							: fontFileName
						let fontWeight = fontFileName.split('-')[1]
							? fontFileName.split('-')[1]
							: fontFileName

						const fontWeights = {
							thin: 100,
							extralight: 200,
							light: 300,
							medium: 500,
							semibold: 600,
							bold: 700,
							extrabold: 800,
							heavy: 800,
							black: 900,
						}

						fontWeight = fontWeights[fontWeight.toLowerCase()] ?? 400

						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
							cb
						)
						newFileOnly = fontFileName
					}
				}
			} else {
				console.log(
					'Файл scss/fonts.scss уже существует.\nДля обнавления файла нужно его удалить!'
				)
			}
		}
	})
	done()
	function cb(err) {
		if (err) console.log(err)
	}
}
