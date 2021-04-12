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
};

galleryContainer.addEventListener('click', onGalleryContainerClick);
let currentSlide = 0;
let n = 0;
let slides = document.querySelectorAll('.gallery__image');

function onGalleryContainerClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) { return; };

    findingCurrentSlide(evt);
    
    findinAtributesFromCurrentSlide(currentSlide);

    if (!modalLightbox.classList.contains('is-open')) {
    modalLightbox.classList.add('is-open');  }

    closeModalBtn.addEventListener('click', onCloseModalBtnClick);
    lightboxOverlay.addEventListener('click', onlightboxOverlayClick)
    window.addEventListener('keydown', onEscKeyPress);
    if (modalLightbox.classList.contains('is-open')) {
        window.addEventListener('keydown', onChangingImgKeyPress);
    };
};

function findingCurrentSlide(evt) {
    for (let i = 0; i < slides.length; i += 1) {
        if (slides[i].alt === evt.target.alt) {
            console.log(`Текущий елемент № ${i}`);
            currentSlide = slides[i];
            console.log(currentSlide);
            console.log(evt.target);
            n = i;
            // evt.target = currentSlide;
        }
    };
}

function findinAtributesFromCurrentSlide(currentSlide) {
    let bigImageUrl = currentSlide.dataset.source;
    let bigImageAlt = currentSlide.alt;
    
    imgAttributesChanging(bigImageUrl, bigImageAlt);
}

function imgAttributesChanging(url, alt) {
    necessaryImg.src = url;
    necessaryImg.alt = alt;
};

function onCloseModalBtnClick() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onChangingImgKeyPress);
};
function onlightboxOverlayClick() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onChangingImgKeyPress);
};
function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
        modalLightbox.classList.remove('is-open');
        lightboxImageSrcCleaning();
        window.removeEventListener('keydown', onChangingImgKeyPress);
    }   
};

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
    currentSlide = slides[n - 1];
    console.log(currentSlide);
    findinAtributesFromCurrentSlide(currentSlide);
};
function showNextImg() {
    currentSlide = slides[n + 1];
    console.log(currentSlide);
    findinAtributesFromCurrentSlide(currentSlide);
    // goToSlide(currentSlide + 1);
};
// function goToSlide(n) {
//   currentSlide = (n + slides.length) % slides.length;
//   const imgSlideRef = slides[currentSlide];
//   
// }


// let slides = document.querySelectorAll('.gallery__image');
// let currentSlide = 0;
// function onArrowSlider(event) {
//   if (event.code === 'ArrowRight') {
//     nextSlide();
//   } else if (event.code === 'ArrowLeft') {
//     previousSlide();
//   }
// }
// function nextSlide() {
//   goToSlide(currentSlide + 1);
// }
// function previousSlide() {
//   goToSlide(currentSlide - 1);
// }
// function goToSlide(n) {
//   currentSlide = (n + slides.length) % slides.length;
//   const imgSlideRef = slides[currentSlide];
//   onImgModal(imgSlideRef);
// }


 // const currentImgIndex = resources.map(({ preview, original, description }) => {
    //     if (description === evt.target.alt) {
    //        return resources.
    //    }
    // });