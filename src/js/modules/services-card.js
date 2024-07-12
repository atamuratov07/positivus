const servicesListNode = document.querySelector('.services__list')

const renderServicesData = (data) => {
	data.forEach((item) => {
		const servicesCardHTML = `
      <article class="services-card services-card--${
				item?.bgColor || 'grey'
			}-bg">
         <div class="services-card__body">
            <h3 class="services-card__title">
               <span class="text-bg text-bg--${
									item?.textBgColor || 'green'
								}">${titleTop}</span>
               <span class="text-bg text-bg--${
									item?.textBgColor || 'green'
								}">${titleBottom}</span>
            </h3>
            <a href="#" class="services-card__link services-card__link--${
							item?.linkColor || 'green'
						}">
               <span class="services-card__link-icon-wrapper">
                  @@include('../../images/icons/arrow-top-right.svg')
               </span>
               <span class="services-card__link-label">Learn more</span>
            </a>
         </div>
         <img
            class="services-card__image"
            src="./images/services/${image}.svg"
            alt=""
            width="210"
            height="170"
            loading="lazy"
         />
      </article>`
		const servicesItemNode = document.createElement('div')
		servicesItemNode.classList.add('services__item')
		servicesItemNode.appendChild(servicesCardHTML)

		servicesListNode.insertAdjacentHTML('beforeend', servicesItemNode)
	})
}

const getServicesData = async () => {
	const servicesJSON = await fetch('../../data/services.json')
	const servicesData = await servicesJSON.json()

	renderServicesData()
}
