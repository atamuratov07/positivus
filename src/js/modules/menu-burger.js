import { isMobile, toggleLockScroll } from './functions.js'
;(() => {
	if (!isMobile()) return

	const BurgerMenu = document.querySelector('.header__menu')
	const BurgerMenuItems = BurgerMenu.querySelectorAll('.header__menu-item')
	const BurgerButton = document.querySelector('.burger-button')

	BurgerButton.addEventListener('click', e => {
		BurgerButton.classList.toggle('_active')
		BurgerMenu.classList.toggle('_active')

		toggleLockScroll()
	})
	BurgerMenuItems.forEach(item => {
		item.addEventListener('click', e => {
			BurgerButton.classList.remove('_active')
			BurgerMenu.classList.remove('_active')

			toggleLockScroll()
		})
	})
})()
