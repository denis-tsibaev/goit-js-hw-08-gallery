 "use strict";

import gallery from "./gallery-items.js";

const container = document.querySelector(".js-gallery");
const jsLightbox = document.querySelector(".js-lightbox");
const grayBackGround = document.querySelector(".lightbox__content");
const originalImage = document.querySelector(".lightbox__image");
const button = document.querySelector(".lightbox__button");


// function createGalery(images) {
//   const imageGallery = images.reduce(
//     (item, img) =>
//       item +
//       `<li class="gallery__item">
//     <a class="gallery__link" href="#">
//       <img class="gallery__image" 
//       src = '${img.preview}'
//       data-source = '${img.original}'
//       alt = '${img.description}'/>
//     </a>
//     </li>`,
//     ""
//   );
//   return container.insertAdjacentHTML("afterbegin", imageGallery);
// }

function createGalery(images) {
	return images.map(({preview, original}) => {
	 	return
		`<li class="gallery__item">
	  <a class="gallery__link" href="#">
		<img class="gallery__image" 
		src = '${img.preview}'
		data-source = '${img.original}'
		alt = '${img.description}'/>
	  </a>
	  </li>`,
	  ""
	}));
}

container.insertAdjacentHTML("afterbegin", imageGallery);
createGalery(gallery);

container.addEventListener("click", onClick);

function onClick(event) {
  let checkClick = event.target;
  if (checkClick.classList.contains("gallery__image")) {
    jsLightbox.classList.add("is-open");
    originalImage.setAttribute("src", checkClick.dataset.source);
    button.addEventListener("click", onClickBtn);
    grayBackGround.addEventListener("click", closeModalClickBackGrount);
    window.addEventListener("keydown", funcPressEsc);
  }
}

function onClickBtn(event) {
  let checkBtn = event.target;
  if (!checkBtn.classList.contains("lightbox__image")) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
    button.removeEventListener("click", onClickBtn);
    grayBackGround.removeEventListener("click", closeModalClickBackGround);
    window.removeEventListener("keydown", funcPressEsc);
  }
}

function closeModalClickBackGround(event) {
  if (event.target === event.currentTarget) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
  }
}

function funcPressEsc(event) {
	// event.keyCode === 27 escape button
  if (event.keyCode === 27) {
    jsLightbox.classList.remove("is-open");
    originalImage.removeAttribute("src");
  }
}