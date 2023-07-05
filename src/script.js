const adsJson = "../data/ads.json";

const newsGrid = document.getElementById("newsGrid");
const bannerTop = document.getElementById("bannerTop");
const asideImg = document.getElementById("asideImg");

const mainImg = document.getElementById("mainImg");
const title = document.getElementById("title");
const description = document.getElementById("description");
const btn = document.getElementById("readMore");

let articles = [];
let data;
let random = Math.floor(Math.random() * 8);
const defaultSource = "https://www.rt.com/rss/";

const loadMain = async (source) => {
  if (!source) {
    source = defaultSource;
  }

  let res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" + source
  );
  data = await res.json();
  articles = await data.items;
  let id = articles[0].pubDate;

  articles[0].description = articles[0].description.replace(/<img[^>]*>/g, "");

  mainImg.src = articles[0].enclosure.link;

  title.innerText = articles[0].title;

  description.innerHTML = articles[0].description;

  btn.dataset.id = id;

  newsGrid.innerHTML = "";
  articles.forEach((element) => {
    element.description = element.description.replace(/<img[^>]*>/g, "");
    let id = element.pubDate;

    newsGrid.innerHTML += `

    <div class="container col-12 col-md-6 col-lg-3 mt-4 mb-4 p-3">
    <div class="card">
        <div class="bg-image hover-overlay ripple shadow-2-strong"
        data-mdb-ripple-color="light" id="img-container">
        <img id="gridImg"src="${element.enclosure.link}" class="img-fluid"/>
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
        </div >
        </div>
        <h4>${element.title}</h4>
            <p class="text-muted">
              ${element.description}
              </p>
              <button type="button" class="btn btn-primary" id="readMore" data-id="${id}">Read more</button>
              </div>
              </div>

              `;
  });
  document.addEventListener("click", async (event) => {
    if (event.target.id === "readMore") {
      let articleId = event.target.dataset.id;
      let articleURL = `./article.html?source=${encodeURIComponent(
        source
      )}&id=${encodeURIComponent(articleId)}`;
      window.open(articleURL, "_self");
    }
  });
};

const getAds = async () => {
  let res = await fetch(adsJson);
  data = await res.json();
};
const loadAds = async () => {
  bannerTop.innerHTML = `
  <img src="${data[0].link}"></img>
  `;

  asideImg.innerHTML = `
  <img src="${data[random].link}"></img>
  
  `;
};

(async () => {
  await loadMain();
  await getAds();
  await loadAds();
})();
