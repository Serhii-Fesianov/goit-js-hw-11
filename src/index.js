import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('.js-load-more'),
};

const wrapperMarkup = document.querySelector('.gallery');
