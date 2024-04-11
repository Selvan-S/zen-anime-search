const anime_info = document.querySelector("#anime-info");
const anime_search_inp = document.querySelector("#animeInp");
const anime_search_form = document.querySelector("#anime-search-form");

// Fetching data from Kitsu api
async function getData(anime) {
  const res = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${anime}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  renderInfo(data);
}

// Reandering Anime info via card
function renderInfo(data) {
  console.log(data.data[0]);
  anime_info.innerHTML = `
    <div class="card m-4">
      <img class="card-img-top" src=${
        data.data[0].attributes.posterImage.large
      } alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">${data.data[0].attributes.canonicalTitle}</h5>
        <p class="card-text">
          <span class="fw-bold text-info">Synopsis:</span> <span>${
            data.data[0].attributes.synopsis
          }</span> <br />
          <span class="fw-bold text-info">Start Date:</span> <span>${
            !data.data[0].attributes.startDate
              ? "N/A"
              : new Date(data.data[0].attributes.startDate)
          }</span><br />
          <span class="fw-bold text-info">Status:</span> <span>${
            !data.data[0].attributes.status
              ? "N/A"
              : data.data[0].attributes.status
          }</span><br />
          <span class="fw-bold text-info">End Date:</span> <span>${
            !data.data[0].attributes.endDate
              ? "N/A"
              : new Date(data.data[0].attributes.endDate)
          }</span><br />
          <span class="fw-bold text-info">Episode Count:</span> <span>${
            !data.data[0].attributes.episodeCount
              ? "N/A"
              : data.data[0].attributes.episodeCount
          }</span> <br />
          <span class="fw-bold text-info">Age Rating:</span> <span>${
            !data.data[0].attributes.ageRating
              ? "N/A"
              : data.data[0].attributes.ageRating
          }</span><br />
          <span class="fw-bold text-info">Age Rating Guide:</span> <span>${
            !data.data[0].attributes.ageRatingGuide
              ? "N/A"
              : data.data[0].attributes.ageRatingGuide
          }</span><br />
          <span class="fw-bold text-info">Average Rating:</span> <span>${
            !data.data[0].attributes.averageRating
              ? "N/A"
              : data.data[0].attributes.averageRating
          }</span><br />
        </p>
        <p class="card-text">
          <small class="text-muted">Updated at: ${new Date(
            data.data[0].attributes.updatedAt
          )}</small>
        </p>
      </div>
    </div>
  `;
}

// Submit
anime_search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = anime_search_inp.value.trim();
  let filterValue = inputValue.split(" ").join("%20");
  if (!filterValue) {
    alert("Input should not be empty");
  } else {
    anime_info.innerHTML = spinner();
    anime_search_form.reset();
    getData(filterValue);
  }
});

function spinner() {
  return `<div class="spinner-border text-primary d-flex justify-content-center mx-auto w-full" role = "status">
    </div >`;
}
