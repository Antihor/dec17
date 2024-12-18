import axios from 'axios';

export async function fetchImg(query, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';

  const params = {
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const url = `${BASE_URL}${END_POINT}?key=${API_KEY}`;

  const resp = await axios.get(url, { params });
  return resp.data;
}
