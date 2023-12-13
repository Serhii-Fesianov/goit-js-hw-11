import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '41241875-626c3239215a842e842cb8043';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';

export const getAllPhotos = (q, page) => {
  const params = new URLSearchParams({
    q,
    page,
    key: '41241875-626c3239215a842e842cb8043',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return '41241875-626c3239215a842e842cb8043'(
    `${BASE_URL}/search/photos?${params}`
  );
};
