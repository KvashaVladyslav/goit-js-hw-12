import axios from 'axios';

export async function getImages(query, currentPage) {
  const BASE_ULR = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = BASE_ULR + END_POINT;

  const params = {
    key: '43020663-61586e43f3e56b8b813ab6c78',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
