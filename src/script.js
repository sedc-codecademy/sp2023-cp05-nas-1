//data
const localJson = "./data/article.final.json";
const defaultSource = "https://www.rt.com/rss/";
const adsJson = "../data/ads.json";
//page elements
const newsGrid = document.getElementById("newsGrid");
const bannerTop = document.getElementById("bannerTop");
const banner = document.getElementById("banner");
const asideAd = document.getElementById("aside");

let articles = [];
let data;

const getAds = async () => {
  let res = await fetch(adsJson);
  data = await res.json();
};

const loadAds = async () => {
  bannerTop.innerHTML = `
  <img src="${data[0].link}"></img>
  `;

  asideAd.innerHTML = `
  <img src="${data[2].link}"></img>
  
  `;
  getAds();
};

const loadMain = async () => {
  let res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" + defaultSource
  );
  data = await res.json();
  console.log(data);
  articles = data.items;
  let id = articles[0].pubDate;

  articles[0].description = articles[0].description.replace(/<img[^>]*>/g, "");
  console.log(articles);

  const mainImg = document.getElementById("mainImg");
  mainImg.src = articles[0].enclosure.link;

  const title = document.getElementById("title");
  title.innerText = articles[0].title;

  const description = document.getElementById("description");
  description.innerHTML = articles[0].description;

  const btn = document.getElementById("readMore");
  btn.dataset.id = id;

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
        <hr>
        <h4>${element.title}</h>
        </div >

            <p class="text-muted">
              ${element.description}
            </p>
            <button type="button" class="btn btn-primary" id="readMore" data-id="${id}">Read more</button>
          </div>
        </div >

      </div >
      `;
  });
};

document.addEventListener("click", async (event) => {
  if (event.target.id === "readMore") {
    let articleId = event.target.dataset.id;
    window.open(`./article.html?id=${articleId}`, "_self");
  }
});

(async () => {
  await loadMain();
  await getAds();
  await loadAds();
})();
