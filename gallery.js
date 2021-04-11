import resources from './gallery-items.js'

// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. 
// Проверка на кликанье по Li-шке галереи
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// 1. Закрытие модального окна по клику на div.lightbox__overlay.
// 2. Закрытие модального окна по нажатию клавиши ESC.
// 3. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const galleryContainer = document.querySelector('.js-gallery');
const modalLightbox = document.querySelector('div.lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const necessaryImg = modalLightbox.querySelector('.lightbox__image');

const cardsMarkup = createGalleryCardsMarkup(resources);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);


function createGalleryCardsMarkup(resources) {
  return resources
    .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}" onclick="event.preventDefault()" >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}" /> </a>
    </li>`;
  }).join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);


function onGalleryContainerClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) { return; }; 

    const bigImageUrl = evt.target.dataset.source;
    const bigImageAlt = evt.target.alt;
    
    modalLightbox.classList.add('is-open');     
  
    imgAttributesChanging(bigImageUrl, bigImageAlt);

    closeModalBtn.addEventListener('click', onCloseModalBtnClick);
};

function imgAttributesChanging(url, alt) {
    necessaryImg.src = url;
    necessaryImg.alt = alt;
};

function onCloseModalBtnClick() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
};

function lightboxImageSrcCleaning() {
    necessaryImg.src = '';
};
