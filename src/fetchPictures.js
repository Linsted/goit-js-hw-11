// ASYNC Function//
export { fetchPictures };
import Notiflix from 'notiflix';
import axios from 'axios';
import { perPage } from './indexInfScr';

async function  fetchPictures(query, page) {
    const BASE_URL = `https://pixabay.com/api/`;
    const notify = 'Sorry, there are no images matching your search query. Please try again.'

    const searchParams = new URLSearchParams({
      image_type: `photo`,
      orientation: `horizontal`,
      safesearch: `true`, 
      q: query,
      key: `32978489-20caeca748ffe4537bd9570d6`,
        page,
      per_page: perPage,
});

    const options = {
      headers: {
        Accept: "application/json",
      }
    }

    try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`, options);
    const {data} = response;
        if (data.hits.length === 0) { return Notiflix.Notify.warning(notify) };
    return data;
    } catch (error) {
    console.error(error);
  }
}
