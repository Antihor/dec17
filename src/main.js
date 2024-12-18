import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImg } from './js/api';
import { templateHits } from './js/render';

const refs = {
  form: document.querySelector('.js-form'),
  more: document.querySelector('.js-more'),
  gallery: document.querySelector('.js-gallery'),
  target: document.querySelector('.js-target'),
};
let page;
let query;
let lastPage;

refs.form.addEventListener('submit', onSubmit);
// refs.more.addEventListener('click', onMore);

async function onSubmit(ev) {
  ev.preventDefault();
  page = 1;

  query = ev.target.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Error!',
      message: 'No query!',
      position: 'center',
    });
    return;
  }
  const data = await fetchImg(query, page);
  lastPage = Math.ceil(data.total / 15);
  if (data.total === 0) {
    iziToast.error({
      title: 'Sorry!',
      message: 'No images found for your query',
      position: 'center',
    });
  }
  refs.gallery.innerHTML = '';
  renderImages(data.hits);

  checkStatus();

  refs.form.reset();
}

async function onMore() {
  page += 1;

  const data = await fetchImg(query, page);

  renderImages(data.hits);
  checkStatus();

  const height = refs.gallery.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });

  refs.form.reset();
}

function renderImages(hits) {
  const markup = templateHits(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// function showMore() {
//   refs.more.classList.remove('hidden');
// }

// function hideMore() {
//   refs.more.classList.add('hidden');
// }

// function checkMore() {
//   if (page >= lastPage) {
//     hideMore();
//   } else {
//     showMore();
//   }
// }

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onMore();
    }
  });
};

const observer = new IntersectionObserver(callback, options);

function observeTarget() {
  observer.observe(refs.target);
}

function unobserveTarget() {
  observer.unobserve(refs.target);
}
function checkStatus() {
  if (page >= lastPage) {
    unobserveTarget();
  } else {
    observeTarget();
  }
}
