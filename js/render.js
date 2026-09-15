'use strict';

const cardsData = [
	{ imgSrc: './assets/img/about/about.png', title: 'Лендинг для кофейни', desc: 'Адаптивный одностраничный сайт с анимациями при скролле и формой обратной связи.', tags: ['HTML5', 'CSS3', 'JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Приложение погоды', desc: 'Веб-приложение с использованием OpenWeather API.', tags: ['JavaScript', 'API'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Todo-лист', desc: 'Классическое приложение для управления задачами.', tags: ['JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png', title: 'Лендинг для кофейни', desc: 'Адаптивный одностраничный сайт с анимациями при скролле и формой обратной связи.', tags: ['HTML5', 'CSS3', 'JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Приложение погоды', desc: 'Веб-приложение с использованием OpenWeather API.', tags: ['JavaScript', 'API'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Todo-лист', desc: 'Классическое приложение для управления задачами.', tags: ['JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png', title: 'Лендинг для кофейни', desc: 'Адаптивный одностраничный сайт с анимациями при скролле и формой обратной связи.', tags: ['HTML5', 'CSS3', 'JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Приложение погоды', desc: 'Веб-приложение с использованием OpenWeather API.', tags: ['JavaScript', 'API'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Todo-лист', desc: 'Классическое приложение для управления задачами.', tags: ['JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png', title: 'Лендинг для кофейни', desc: 'Адаптивный одностраничный сайт с анимациями при скролле и формой обратной связи.', tags: ['HTML5', 'CSS3', 'JavaScript'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Приложение погоды', desc: 'Веб-приложение с использованием OpenWeather API.', tags: ['JavaScript', 'API'], link: '#', },
	{ imgSrc: './assets/img/about/about.png',  title: 'Todo-лист', desc: 'Классическое приложение для управления задачами.', tags: ['JavaScript'], link: '#', },
];

function createCardElement(item) {
	const col = document.createElement('div');
	col.className = 'col-lg-4 col-md-6';

	const card = document.createElement('article');
	card.className = 'card projects-section__item h-100';

	if (item.imgSrc) {
		const img = document.createElement('img');
		img.src = item.imgSrc;
		img.alt = item.alt || item.title;
		img.className = 'card-img-top';
		img.loading = 'lazy';
		img.decoding = 'async';
		card.append(img);
	}

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body projects-section__content d-flex flex-column';

	if (item.title) {
		const title = document.createElement('h3');
		title.className = 'card-title projects-section__title';
		title.textContent = item.title;
		cardBody.append(title);
	}

	if (item.desc) {
		const desc = document.createElement('p');
		desc.className = 'card-text projects-section__desc flex-grow-1';
		desc.textContent = item.desc;
		cardBody.append(desc);
	}

	if (item.tags && item.tags.length > 0) {
		const tagsContainer = document.createElement('div');
		tagsContainer.className = 'projects-section__tags mt-auto';

		item.tags.forEach(tag => {
			const tagElement = document.createElement('span');
			tagElement.className = 'projects-section__tag';
			tagElement.textContent = tag;
			tagsContainer.append(tagElement);
		});

		cardBody.append(tagsContainer);
	}

	if (item.link) {
		const btn = document.createElement('a');
		btn.href = item.link;
		btn.className = 'btn btn-primary projects-section__btn mt-3';
		btn.innerHTML = `
			<img src="./assets/icons/git.png" alt="Git" width="16" height="16">
			Код
		`;
		
		cardBody.append(btn);
	}

	card.append(cardBody);
	col.append(card);

	return col;
}

const INITAL_LIMIT = 6;
let currentLimit = INITAL_LIMIT;
let listElement = null;
let toggleBtn = null;

function renderCardsToSection(selector, items, limit = items.length) {
	const container = document.querySelector(selector);
	if (!container) {
		console.warn(`Контейнер ${selector} не найден!`);
		return;
	}

	if (!listElement) {
		listElement = document.createElement('div');
		listElement.className = 'row g-4';
		container.append(listElement);
	}

	if (!toggleBtn) {
		const loadMore = document.createElement('div');
		loadMore.className = 'load-more';
		container.append(loadMore);

		toggleBtn = document.createElement('button');
		toggleBtn.type = 'button';
		toggleBtn.className = 'btn load-more__btn';

		toggleBtn.addEventListener('click', () => {
			if (currentLimit >= items.length)
				currentLimit = INITAL_LIMIT;
			else
				currentLimit = items.length;

			renderCardsToSection(selector, items, currentLimit);
		});

		loadMore.append(toggleBtn);
	}

	listElement.innerHTML = '';
	items.slice(0, limit).forEach(item => {
		listElement.append(createCardElement(item));
	});

	updateToggleBtn(items);
}

function updateToggleBtn(items) {
	if (items.length <= INITAL_LIMIT) {
		toggleBtn.style.display = 'none';
		return;
	}

	toggleBtn.style.display = '';

	if (currentLimit >= items.length) {
		toggleBtn.textContent = 'Скрыть';
	} else {
		const remaining = items.length - currentLimit;
		toggleBtn.textContent = `Показать все (${remaining})`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	renderCardsToSection('.projects-section .container', cardsData, 6);
});