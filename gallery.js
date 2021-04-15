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
const modalLightbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const lightboxOverlay = modalLightbox.querySelector('.lightbox__overlay');
const necessaryImg = modalLightbox.querySelector('.lightbox__image');

const cardsMarkup = createGalleryCardsMarkup(resources);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryCardsMarkup(resources) {
    return resources
        .map(res => {
            const { preview, original, description } = res;
            return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}" onclick="event.preventDefault()" >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    data-index="${resources.indexOf(res)}" /> </a>
            </li>`;
            }).join('');
};

galleryContainer.addEventListener('click', onGalleryContainerClick);
let currentSlide = 0;
let slides = document.querySelectorAll('.gallery__image');

function onGalleryContainerClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) { return; };

    currentSlide = evt.target;
    console.log(currentSlide);

    imgAttributesChanging(currentSlide)
    
    if (!modalLightbox.classList.contains('is-open')) {
        modalLightbox.classList.add('is-open');
    }

    if (modalLightbox.classList.contains('is-open')) {
        window.addEventListener('keydown', onChangingImgKeyPress);
    };

    closeModalBtn.addEventListener('click', onCloseModal);
    lightboxOverlay.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onEscKeyPress);   
};

function imgAttributesChanging(currentSlide) {
    necessaryImg.src = currentSlide.dataset.source;
    necessaryImg.alt = currentSlide.alt;
};

function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) { onCloseModal() }   
};

function onCloseModal() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onChangingImgKeyPress);
}

function lightboxImageSrcCleaning() {
    necessaryImg.src = '';
};

function onChangingImgKeyPress(event) {
    const PREV_IMG_KEY_CODE = 'ArrowLeft';
    const NEXT_IMG_KEY_CODE = 'ArrowRight';
    let isPrevImgKey = event.code === PREV_IMG_KEY_CODE;
    let isNextImgKey = event.code === NEXT_IMG_KEY_CODE;
    if (isPrevImgKey) {
        console.log('Pressed ArrowLeft');
        showPrevImg();
    } else if (isNextImgKey) {
        console.log('Pressed ArrowRight');
        showNextImg();
    }
};

function showPrevImg() {
    if (currentSlide.dataset.index > 0) {
        currentSlide = slides[Number(currentSlide.dataset.index) - 1];
    } else { currentSlide = slides[8];}
    necessaryImg.src = currentSlide.dataset.source;
    necessaryImg.alt = currentSlide.alt;
    console.log(currentSlide);
    console.log(`Текущий слайд № ${currentSlide.dataset.index}`);
};
function showNextImg() {
    if (currentSlide.dataset.index < 8) {
        currentSlide = slides[Number(currentSlide.dataset.index) + 1];
    } else { currentSlide = slides[0];}
    necessaryImg.src = currentSlide.dataset.source;
    necessaryImg.alt = currentSlide.alt;
    console.log(currentSlide);
    console.log(`Текущий слайд № ${currentSlide.dataset.index}`);
};