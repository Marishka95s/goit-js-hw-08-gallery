const resources = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(resources);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryCardsMarkup(resources) {
  return resources
    .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a  class="gallery__link" href="${original}" >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}" /> </a>
    </li>`;
  }).join('');
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  if (!evt.target.classList.contains('gallery__item')) { return; }; // Проверка на кликанье по Li-шке галереи

  const swatchEl = evt.target;
  const bigImageUrl = swatchEl.dataset.original;
  console.log(bigImageUrl);

// Открытие модального окна по клику на элементе галереи.
  const currentActiveEl = document.querySelector('div.lightbox');
  currentActiveEl.classList.add('is-open');

// Подмена значения атрибута src элемента img.lightbox__image.
  const necessaryIMG = currentActiveEl.querySelector('.lightbox__image');
  necessaryIMG.dataset.src = bigImageUrl;

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
  const closeModalBtn = document.querySelector('.lightbox__button');
  closeModalBtn.addEventListener('click', onCloseModalBtnClick);
};

function onCloseModalBtnClick() {
  currentActiveEl.classList.remove('is-open');

// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  lightboxImageSrcCleaning();
};

function lightboxImageSrcCleaning() {
  necessaryIMG.dataset.src = "";
};
