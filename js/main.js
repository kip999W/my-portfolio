"use strict";

document.addEventListener('DOMContentLoaded', function() {
	const navbar = document.querySelector('.navbar');
	const btnEl = document.querySelector('.btnTop');

	if (!navbar) {
		console.warn(`Элемент .navbar не найден!`);
		return;
	}

	const checkScroll = () => {
		const isScrolled = window.scrollY > 80;
		navbar.classList.toggle('scrolled', isScrolled);
		
		if (btnEl) {
			btnEl.classList.toggle('btnTopActive', isScrolled);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const anchors = document.querySelectorAll('a[href*="#"]');
	anchors.forEach(anchor => {
		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);
			const targetBlock = document.getElementById(blockID);

			if (targetBlock) {
				targetBlock.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}

			const offcanvasElement = document.getElementById('offcanvasNavbar');
			if (offcanvasElement) {
				const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
				if (offcanvasInstance) {
					offcanvasInstance.hide();
				}
			}
		});
	});

	const form = document.getElementById('contactForm');

	if (form) {
		const nameInput = document.getElementById('name');
		const emailInput = document.getElementById('email');
		const subjectInput = document.getElementById('subject');
		const messageInput = document.getElementById('message');

		const nameError = document.getElementById('nameError');
		const emailError = document.getElementById('emailError');
		const subjectError = document.getElementById('subjectError');
		const messageError = document.getElementById('messageError');
		const successMessage = document.getElementById('successMessage');

		function setValidationStatus(inputElement, errorElement, isValid, errorMessage = '') {
			if (isValid) {
				inputElement.classList.remove('is-invalid');
				inputElement.classList.add('is-valid');
				errorElement.textContent = '';
			} else {
				inputElement.classList.remove('is-valid');
				inputElement.classList.add('is-invalid');
				if (errorMessage) {
					errorElement.textContent = errorMessage;
				}
			}
		}

		nameInput.addEventListener('input', () => {
			const value = nameInput.value.trim();
			const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

			if (value === '')
				setValidationStatus(nameInput, nameError, false, 'Пожалуйста, введите ваше имя');
			else if (!namePattern.test(value))
				setValidationStatus(nameInput, nameError, false, 'Имя может содержать только буквы и дефис');
			else if (value.length < 2)
				setValidationStatus(nameInput, nameError, false, 'Имя слишком короткое');
			else
				setValidationStatus(nameInput, nameError, true);
		});

		emailInput.addEventListener('input', () => {
			const value = emailInput.value.trim();
			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			if (value === '')
				setValidationStatus(emailInput, emailError, false, 'Пожалуйста, введите email');
			else if (!emailPattern.test(value))
				setValidationStatus(emailInput, emailError, false, 'Неверный формат email');
			else
				setValidationStatus(emailInput, emailError, true);
		});

		subjectInput.addEventListener('input', () => {
			const value = subjectInput.value.trim();

			if (value === '')
				setValidationStatus(subjectInput, subjectError, false, 'Пожалуйста, введите тему');
			else if (value.length < 3)
				setValidationStatus(subjectInput, subjectError, false, 'Тема слишком короткая');
			else
				setValidationStatus(subjectInput, subjectError, true);
		});

		messageInput.addEventListener('input', () => {
			const value = messageInput.value.trim();

			if (value === '')
				setValidationStatus(messageInput, messageError, false, 'Пожалуйста, введите сообщение');
			else if (value.length < 10)
				setValidationStatus(messageInput, messageError, false, 'Минимум 10 символов');
			else
				setValidationStatus(messageInput, messageError, true);
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			if (successMessage) {
				successMessage.style.display = 'none';
			}

			nameInput.dispatchEvent(new Event('input'));
			emailInput.dispatchEvent(new Event('input'));
			subjectInput.dispatchEvent(new Event('input'));
			messageInput.dispatchEvent(new Event('input'));

			const hasErrors = nameInput.classList.contains('is-invalid') || 
							  emailInput.classList.contains('is-invalid') ||
							  subjectInput.classList.contains('is-invalid') || 
							  messageInput.classList.contains('is-invalid');

			if (hasErrors) {
				alert('Пожалуйста, заполните все поля корректно перед отправкой!');
			} else {
				if (successMessage) {
					successMessage.style.display = 'block';
				}
				
				form.reset();
				[nameInput, emailInput, subjectInput, messageInput].forEach(input => { 
					input.classList.remove('is-valid'); 
				});
			}
		});
	}

	document.addEventListener('scroll', checkScroll, { passive: true });
	
	if (btnEl) {
		btnEl.addEventListener('click', scrollToTop);
	}
});