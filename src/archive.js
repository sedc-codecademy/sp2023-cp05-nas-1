
const localJson = "./data/article.final.json";
const archive = document.getElementById("archive");
let articles = [];

const getArticle = async () => {

  await fetch(localJson)
    .then((res) => res.json())
    .then((data) => {
      articles = data
      console.log(articles)
    })
}
const loadArchive = async () => {

  articles.forEach((element => {

    element.description = element.description.replace(/<img[^>]*>/g, "");
    //let id = element.pubDate
    // console.log(id)
    archive.innerHTML += `
              
<div class="col-12 col-md-6 col-lg-3 mt-4 mb-4 p-3">
  <div class="card">
      <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
        data-mdb-ripple-color="light">
        <img id="mainImg" src="${element.enclosure.link}" class="img - fluid" />
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </div >
    </div >

      <p class="text-muted">
        ${element.description}
      </p>
    </div>
  </div >

</div >
      `

  }));
};



//<button type="button" class="btn btn-primary" id="readMore" data-id="${id}">Read more</button>


(async () => {
  await getArticle()

  loadArchive()
})();
