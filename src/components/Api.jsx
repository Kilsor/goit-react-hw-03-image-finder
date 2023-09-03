import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38490370-b1a7edf456ff4537f6870c934';

export const fetchImages = async (fullQuery, page = 1) => {
  try {
    // Розділяємо рядок за символом '/'
    const queryParts = fullQuery.split('/');

    // Отримуємо елемент (після останнього '/')
    const query = queryParts[queryParts.length - 1];

    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.hits;
  } catch (error) {
    throw error;
  }
};
