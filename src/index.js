import { getAllPhotos } from './js/api';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

let page = 1;
let inputValue = '';
const hint = document.querySelector('.warning-hint');

function checkPage(hits) {
  if (hits.length === 0) {
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }
}

refs.btnLoadMore.addEventListener('click', event => {
  event.preventDefault();
  page += 1;
  inputValue = refs.input.value;
  console.log(page);
  getAllPhotos(inputValue, page).then(data => {
    const markup = setResponseInPage(data.hits);
    refs.gallery.innerHTML = markup;
    checkPage(data.hits);
  });
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  inputValue = refs.input.value;
  getAllPhotos(inputValue, 1).then(data => {
    const markup = setResponseInPage(data.hits);
    refs.gallery.innerHTML = markup;
    checkPage(data.hits);
  });
});

function setResponseInPage(hits) {
  return hits
    .map(
      item => `<div class="photo-card">
  <img src="${item.webformatURL}" value="${item.id}" alt="" loading="lazy" width = 300px/>
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
