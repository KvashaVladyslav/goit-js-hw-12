import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const refs = {
  formEl: document.querySelector('.form'),
  searchBtn: document.querySelector('.search-btn'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loaderEl: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery'),
  loaderBox: document.querySelector('.loader'),
};

// =================================================================

let query;
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function closeLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function showLoader() {
  refs.loaderBox.classList.remove('visually-hidden');
}

export function closeLoader() {
  refs.loaderBox.classList.add('visually-hidden');
}

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    iziToast.success({
      color: 'green',
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
    closeLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}

function myScroll() {
  const height = refs.gallery.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  query = e.target.elements.inputname.value.trim();
  showLoader();
  currentPage = 1;
  if (query !== '') {
    try {
      const data = await getImages(query, currentPage);
      maxPage = Math.ceil(data.totalHits / pageSize);
      renderGallery(data.hits);
    } catch {
      iziToast.warning({
        color: 'orange',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } else {
    iziToast.info({
      color: 'blue',
      position: 'topRight',
      message: 'Please, search some object',
    });
  }
  closeLoader();
  checkBtnStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImages(query, currentPage);
    renderGallery(data.hits);
  } catch {
    iziToast.show({
      color: 'red',
      position: 'topRight',
      message: 'Error',
    });
  }
  checkBtnStatus();
  closeLoader();
  myScroll();
}
