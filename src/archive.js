const localJson = "./data/article.final.json";
const archive = document.getElementById("archive");
let articlesJson = [];
let articlesLstorage = [];

const getArticle = async () => {
  let res = await fetch(localJson);
  articlesJson = await res.json();
};
const getArticleFromStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    articlesLstorage.push(JSON.parse(value));
  }
};

const loadArchive = async (source) => {
  source.forEach((element) => {
    element.description = element.description.replace(/<img[^>]*>/g, "");

    archive.innerHTML += `
    
    <div class="col-12 col-md-6 col-lg-3 mt-4 mb-4 p-3">
    <div class="card">
    <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
    data-mdb-ripple-color="light" id="img-container">
    <img id="gridImg" src="${element.enclosure.link}" class="img-fluid"/>
    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </div >
      </div >
      <h4>${element.title}</h4>     
      <p class="text-muted">
      ${element.description}
      </p>
      </div>
      </div>
      `;
  });
};

(async () => {
  await getArticle();
  getArticleFromStorage();
  let source = articlesLstorage.length > 5 ? articlesLstorage : articlesJson;
  await loadArchive(source);
})();
