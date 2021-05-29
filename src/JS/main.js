  
"use strict";

import gallery from "./gallery-items.js";

const container = document.querySelector(".js-gallery");
const jsLightbox = document.querySelector(".js-lightbox");
const origImage = document.querySelector(".lightbox__image");
const button = document.querySelector(".lightbox__button");
const greyBackGround = document.querySelector(".lightbox__content");


function createGalery(images) {
  const imageGallery = images.reduce(
    (item, img) =>
      item +
      `<li class="gallery__item">
    <a class="gallery__link" href="#">
      <img class="gallery__image" 
      src = '${img.preview}'
      data-source = '${img.original}'
      alt = '${img.description}'/>
    </a>
    </li>`,
    ""
  );
  return container.insertAdjacentHTML("afterbegin", imageGallery);
}

createGalery(gallery);

container.addEventListener("click", onClick);

function onClick(event) {
  let checkClick = event.target;
  if (checkClick.classList.contains("gallery__image")) {
    jsLightbox.classList.add("is-open");
    origImage.setAttribute("src", checkClick.dataset.source);
    button.addEventListener("click", onClickBtn);
    greyBackGround.addEventListener("click", closeModalClickBackGrount);
    window.addEventListener("keydown", funcPressEsc);
  }
}

function onClickBtn(event) {
  let checkBtn = event.target;
  if (!checkBtn.classList.contains("lightbox__image")) {
    jsLightbox.classList.remove("is-open");
    origImage.removeAttribute("src");
    button.removeEventListener("click", onClickBtn);
    greyBackGround.removeEventListener("click", closeModalClickBackGrount);
    window.removeEventListener("keydown", funcPressEsc);
  }
}

function closeModalClickBackGrount(event) {
  if (event.target === event.currentTarget) {
    jsLightbox.classList.remove("is-open");
    origImage.removeAttribute("src");
  }
}

function funcPressEsc(event) {
  if (event.keyCode === 27) {
    jsLightbox.classList.remove("is-open");
    origImage.removeAttribute("src");
  }
}