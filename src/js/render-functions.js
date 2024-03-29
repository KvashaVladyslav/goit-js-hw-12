import { lightbox, closeLoader } from '../main';
import { refs } from '../main';

export function renderGallery(array) {
  if (array.length === 0) {
    iziToast.warning({
      color: 'orange',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    closeLoader();
    form.reset();
  } else {
    const showGalleryArr = array
      .map(arr => {
        const {
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = arr;
        return `<li class="gallery-item">
        <a href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            Likes
            <p>${likes}</p>
          </li>
          <li class="info-list-item">
            Views
            <p>${views}</p>
          </li>
          <li class="info-list-item">
            Comments
            <p>${comments}</p>
          </li>
          <li class="info-list-item">
            Downloads
            <p>${downloads}</p>
          </li>
        </ul>
      </li>`;
      })
      .join('');

    refs.gallery.insertAdjacentHTML('beforeend', showGalleryArr);

    lightbox.refresh();
  }
  closeLoader();
}
