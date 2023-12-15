// ============Imports============\\
import { getAllPhotos } from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallerySimple = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSlide: 100,
});

// ============QuerySelectors============\\
const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

// ============Global let/const============\\
let page = 1;
let inputValue = '';
const hint = document.querySelector('.warning-hint');

function checkPage(hits) {
  if (hits.length === 0) {
    hint.style.display = 'block';
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    hint.style.display = 'none';
  }
}

// ============Markup card on page============\\
function setResponseInPage(hits) {
  console.log(hits);
  return hits
    .map(
      item => `<div class="photo-card">
  <a href="${item.largeImageURL}"><img src="${item.webformatURL}" value="${item.id}" alt="${item.tags}" loading="lazy" width = 300px/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

// ============Submit and set markup on page============\\
refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  refs.btnLoadMore.style.display = 'none';
  inputValue = refs.input.value;

  try {
    const { totalHits, hits } = await getAllPhotos(inputValue, 1);
    const markup = setResponseInPage(hits);
    refs.gallery.innerHTML = markup;
    gallerySimple.refresh();
    if (totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (totalHits > 40) {
      refs.btnLoadMore.style.display = 'block';
    }
    checkPage(hits);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

// ============LoadMore button for set more cards============\\
refs.btnLoadMore.addEventListener('click', async event => {
  page += 1;
  inputValue = refs.input.value;

  try {
    const { totalHits, hits } = await getAllPhotos(inputValue, page);
    const lastPage = Math.ceil(totalHits / 40);
    const markup = setResponseInPage(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    gallerySimple.refresh();
    checkPage(hits);
    if (page === lastPage) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      refs.btnLoadMore.style.display = 'none';
    }
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
});
