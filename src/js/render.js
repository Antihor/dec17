function templateHit(hit) {
  const {
    webformatURL,
    largeImageURL,
    comments,
    downloads,
    tags,
    likes,
    views,
  } = hit;
  return ` <a href="${largeImageURL}" class="card" >
      <li>
        <img src="${webformatURL}" alt="${tags}" />
        <div class='card-bottom'>
        <p><b>Views: </b>${views}</p>
        <p><b>Likes: </b>${likes}</p>
        <p><b>Downloads: </b>${downloads}</p>
        <p><b>Comments: </b>${comments}</p>
        </div>
      </li>
    </a>`;
}

export function templateHits(hits) {
  return hits.map(templateHit).join('');
}
