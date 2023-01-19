import './css/styles.css';
import { fetchPictures } from './fetchpictures';    

import Notiflix from 'notiflix';

const refs = {
    form : document.querySelector(`.search-form`)
}

refs.form.addEventListener('submit', onSubmit);
function onSubmit(evt) {
    evt.preventDefault()
}


