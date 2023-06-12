//data
const localJson = "./data/article.final.json";
const defaultSource = "https://www.rt.com/rss/news/";
const adsJson = "../data/ads.json";
//page elements
let articles = [];
let article = [];
const mainArticle = document.getElementById("mainArticle");
const newsGrid = document.getElementById("newsGrid");
const bannerTop = document.getElementById("bannerTop");
const banner = document.getElementById("banner");
const asideAd = document.getElementById("aside");
// data from rss feed
// get data
const a = Math.floor(Math.random() * 10) + 1;
let main = {};
let data;
let test;

// get ads
const getAds = async () => {
  await fetch(adsJson)
    .then((res) => res.json())
    .then((data) => {
      test = data;
      console.log(test[0].link);
    });
};

const loadAds = async () => {
  bannerTop.innerHTML = `
  <img src="${test[0].link}"></img>
  `;

  // banner.innerHTML = `
  // <img src="${test[1].link}"></img>

  // `;

  asideAd.innerHTML = `
  <img src="${test[2].link}"></img>
  
  `;
  getAds();
};

// load main article
const loadMain = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.rss2json.com/v1/api.json?rss_url=" + defaultSource,
    true
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      articles = data.items;
      article = articles[0];
      //console.log(article)
      let id = article.pubDate;

      articles[a].description = articles[a].description.replace(
        /<img[^>]*>/g,
        ""
      );
      //      console.log(articles[a].description)

      mainArticle.innerHTML = `

<div class="container-fluid mt-5">
  <div class="row gx-5">
    <div class="col-md-6 mb-4">
      <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
        data-mdb-ripple-color="light">
        <img id="mainImg" src="${articles[a].enclosure.link}" class="img - fluid" />
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </div >
    </div >

    <div class="col-md-6 mb-4">
      <span class="badge bg-danger px-2 py-2 shadow-1-strong mb-3">Прекршени вести</span>
      <h4><strong>${articles[a].title}</strong></h4>
      <p class="text-muted">
        ${articles[a].description}
      </p>
      <button type="button" class="btn btn-primary" id="readMore" data-id="${id}">Read more</button>
    </div>
  </div >

</div >

  `;

      articles.forEach((element) => {
        element.description = element.description.replace(/<img[^>]*>/g, "");
        let id = element.pubDate;
        // console.log(id)
        newsGrid.innerHTML += `
              
<div class="col-12 col-md-6 col-lg-3 mt-4 mb-4 p-3">
  <div class="card">
      <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
        data-mdb-ripple-color="light">
        <img id="gridImg"src="${element.enclosure.link}" class="img - fluid"/>
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </div >
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
    }
  };

  xhr.send();
};

document.addEventListener("click", async (event) => {
  if (event.target.id === "readMore") {
    let articleId = event.target.dataset.id;
    console.log("click");
    console.log(articleId);

    window.open(`./article.html?id=${articleId}`, "_self");
  }
});

(async () => {
  await loadMain();
  await getAds();
  loadAds();
})();
