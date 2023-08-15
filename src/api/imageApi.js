const perPage = 12;
const API_KEY = '37391031-3c842063259c869251b7769d0';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  const parseResponse = await response.json();
  return parseResponse;
};
