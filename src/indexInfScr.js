import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPictures } from './fetchPictures';
export { perPage };


let options = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0
}

let observer = new IntersectionObserver(onClick, options);


const refs = {
    form: document.querySelector(`.search-form`),
    gallery: document.querySelector(`.gallery`),
  button: document.querySelector(`.load-more`),
  guard: document.querySelector(`.js-guard`)

}

let page = 1;
let requestImg;
let perPage = 40;


refs.form.addEventListener('submit', onSubmit);



function onSubmit(evt) {
    evt.preventDefault()
    requestImg = ``;
    page = 1;
    requestImg = evt.currentTarget.elements.searchQuery.value.trim();
  refs.gallery.innerHTML = ``;
  observer.unobserve(refs.guard);



    fetchPictures(requestImg)
      .then((data) => { 
        console.log(data);
        
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        if (data.totalHits > perPage) { observer.observe(refs.guard) };
        addMarkUp(data)})
        .catch(console.log)  
}

function onClick(entries, observer) {
  if (entries[0].isIntersecting) {
    page += 1;
    
    
  fetchPictures(requestImg, page).then((data) => {
        addMarkUp(data)
    if (page === Math.ceil(data.totalHits / perPage)) {
      observer.unobserve(refs.guard);
            return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        }
        })
        .catch(console.log)
  }
    

}


function addMarkUp(data) {

    const markUp = data.hits.map(picture => {
        return `<div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" height='300' width='400'/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${picture.likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${picture.views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${picture.downloads}
      </p>
    </div>
  </div>`
    }).join('')

    refs.gallery.insertAdjacentHTML(`beforeend`, markUp)
}




