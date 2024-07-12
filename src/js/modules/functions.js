// Проверка поддержки WEBP, добавление .webp или .no-webp для HTML
export function isWebP() {
	function testWebP(callback) {
		let webP = new Image()
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2)
		}
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}

	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp'
		document.documentElement.classList.add(className)
	})
}

export function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase()
	const isMobile =
		/mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
			userAgent
		)

	console.log(isMobile)
	return isMobile
}

export function getScrollBarWidth() {
	if (isMobile()) return 0

	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'

	document.body.append(div)
	let scrollWidth = div.offsetWidth - div.clientWidth

	div.remove()

	return scrollWidth
}

export function lockScroll() {
	document.documentElement.style.setProperty(
		'--scrollbar-width',
		getScrollBarWidth() + 'px'
	)
	document.body.classList.add('_scroll-lock')
}
export function unlockScroll() {
	document.documentElement.style.setProperty('--scrollbar-width', 0)
	document.body.classList.remove('_scroll-lock')
}
export function toggleLockScroll() {
	if (document.body.classList.contains('_scroll-lock')) {
		unlockScroll()
	} else {
		lockScroll()
	}
}
