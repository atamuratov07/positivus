export const server = (done) => {
	$.plugins.browsersync.init({
		server: {
			baseDir: `${$.path.build.html}`,
		},
		notify: false,
		port: 5000,
	})
}
