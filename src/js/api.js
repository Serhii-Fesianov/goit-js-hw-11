import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';

// https://pixabay.com/api/?key=41241875-626c3239215a842e842cb8043&q=yellow+flowers&image_type=photo&pretty=true

export const getAllPhotos = async (q, page) => {
  const params = new URLSearchParams({
    q,
    page,
    per_page: 40,
    key: '41241875-626c3239215a842e842cb8043',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const { data } = await axios.get(`${BASE_URL}?${params}`);
  return data;
};
