'use strict';

import gallery from './gallery-items.js';

const container = document.querySelector('.js-gallery');
const jsLightbox = document.querySelector('.js-lightbox');
const imageEl = document.querySelector('.lightbox__image');
const button = document.querySelector('.lightbox__button');
const divBackGround = document.querySelector('.lightbox__content');

const cardsMarkup = createGallery(gallery);

container.insertAdjacentHTML('beforeend', cardsMarkup);

function createGallery(images) {
    return images
        .map(({ preview, original, description }) => {
            return `
		<li class="gallery__item">
		<a class="gallery__link" href="${original}"
		>
 	     <img
		   class="gallery__image" 
        src = "${preview}"
        data-source = "${original}"
        alt = "${description}"
		/>   
		</a>
        </li>
		`;
        })
        .join('');
}

container.addEventListener('click', onImageClick);

function onImageClick(event) {
    let checkOnClick = event.target;
    if (checkOnClick.classList.contains('gallery__image')) {
        jsLightbox.classList.add('is-open');
        imageEl.setAttribute('src', checkOnClick.dataset.source);
        button.addEventListener('click', onBtnClick);
        divBackGround.addEventListener('click', closeModalClickBackGround);
        window.addEventListener('keydown', funcPressEsc);
    }
}

function onBtnClick(event) {
    let checkOnBtn = event.target;
    if (!checkOnBtn.classList.contains('lightbox__image')) {
        jsLightbox.classList.remove('is-open');
        imageEl.removeAttribute('src');
        button.removeEventListener('click', onBtnClick);
        divBackGround.removeEventListener('click', closeModalClickBackGround);
        window.removeEventListener('keydown', funcPressEsc);
    }
}

function closeModalClickBackGround(event) {
    if (event.target === event.current.target) {
        jsLightbox.classList.remove('is-open');
        imageEl.removeAttribute('src');
    }
}

function funcPressEsc(event) {
    if (event.keyCode === 27) {
        jsLightbox.classList.remove('is-open');
        imageEl.removeAttribute('src');
    }
}
