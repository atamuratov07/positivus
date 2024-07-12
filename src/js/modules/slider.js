/* DOM ELEMENTS =========================== */

const sliderCnt = document.querySelector('.reviews')

const sliderItems = sliderCnt.querySelectorAll('.reviews__slider-item')

const sliderActions = sliderCnt.querySelector('.reviews__actions')

const sliderPagination = sliderActions.querySelector('.pagination')
const sliderPaginationItems = sliderPagination.querySelectorAll(
	'.pagination__button'
)

const prevButton = sliderActions.querySelector('#reviews-slider-prev'),
	nextButton = sliderActions.querySelector('#reviews-slider-next')

/* ======================================= */

const sliderCntStyles = window.getComputedStyle(sliderCnt)
const sliderItemsCount = sliderItems.length
let activeSlideIndex = +sliderCntStyles.getPropertyValue('--slide-offset')

const changeSlide = () => {
	sliderCnt.style.setProperty('--slide-offset', activeSlideIndex)
	checkSlideIndex()
	changePagination()
}
const changePagination = () => {
	const activeItem = sliderPagination.querySelector(
		'.pagination__button.current'
	)
	activeItem?.classList?.remove('current')

	const selectedItem = sliderPagination.querySelector(
		`[data-slide-index="${activeSlideIndex}"]`
	)
	selectedItem.classList.add('current')
}
const checkSlideIndex = () => {
	prevButton.removeAttribute('disabled')
	nextButton.removeAttribute('disabled')

	if (activeSlideIndex === 0) {
		prevButton.setAttribute('disabled', true)
	} else if (activeSlideIndex === sliderItemsCount - 1) {
		nextButton.setAttribute('disabled', true)
	}
}
checkSlideIndex()

/* ======================================= */

const PaginationItemsInit = () => {
	sliderPaginationItems.forEach((item, i) => {
		item.setAttribute('data-slide-index', i)

		if (activeSlideIndex === i) {
			item.classList.add('current')
		}
	})
}
PaginationItemsInit()

const PaginationHandler = (event) => {
	const target = event.target.closest('.pagination__button')
	const slideIndex = target.dataset.slideIndex
	if (!slideIndex || slideIndex == activeSlideIndex) return

	activeSlideIndex = +target.dataset.slideIndex
	changeSlide()
}
sliderPagination?.addEventListener('click', PaginationHandler)

/* ======================================= */

const controlsHandler = (direction) => {
	activeSlideIndex += direction
	changeSlide()
}

prevButton?.addEventListener('click', () => controlsHandler(-1))
nextButton?.addEventListener('click', () => controlsHandler(1))
