export { fetchPictures };
    import axios from 'axios';

async function  fetchPictures() {
    const KEY = `32978489-20caeca748ffe4537bd9570d6`;
    const BASE_URL = `https://pixabay.com/api/`;

    try {
    const response = await axios.get(`https://pixabay.com/api/?key=32978489-20caeca748ffe4537bd9570d6&q=yellow+flowers&image_type=photo`);
    console.log(response);
    } catch (error) {
    console.error(error);
  }

}
fetchPictures()