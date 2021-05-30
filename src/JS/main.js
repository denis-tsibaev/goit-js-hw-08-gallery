import gallery from './gallery-items.js';

const container = document.querySelector('.js-gallery');
const jsLightbox = document.querySelector('.js-lightbox');
const imageEl = document.querySelector('.lightbox__image');
const button = document.querySelector('.lightbox__button');

const cardsMarkup = createGallery(gallery);

container.insertAdjacentHTML('beforeend', cardsMarkup);

function createGallery(images) {
    return images
        .map(({ preview, original, description }) => {
            return `
		<li class="gallery__item">
		<a class="gallery__link" href="#">
 	    <img class="gallery__image" 
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

container.addEventListener('click', openLightboxOnImageClick);

function openLightboxOnImageClick(event) {
    const checkOnImageClick = event.target.classList.contains('gallery__image');
    if (!checkOnImageClick) return;

    jsLightbox.classList.add('is-open');
	imageEl.setAttribute("src", event.target.dataset.source);
	imageEl.setAttribute("alt", event.target.alt);
	// Нагляднее
    // imageEl.src = event.target.dataset.source;
    // imageEl.alt = event.target.alt;

    button.addEventListener('click', onBtnClick);
    window.addEventListener('keydown', CloseByEscBtn);
}

function onBtnClick(event) {
    const checkOnBtn = event.target.classList.contains('lightbox__button');
    if (!checkOnBtn) return;

    jsLightbox.classList.remove('is-open');
    imageEl.removeAttribute('src');
	imageEl.removeAttribute('alt');

    button.removeEventListener('click', onBtnClick);
    window.removeEventListener('keydown', CloseByEscBtn);
}

function CloseByEscBtn(event) {
	// можно использовать keyCode===27 это тоже Escape
    if (event.key === 'Escape') {
        jsLightbox.classList.remove('is-open');
        imageEl.removeAttribute('src');
        imageEl.removeAttribute('alt');
    }
}
