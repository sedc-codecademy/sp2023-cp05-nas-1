

const localJson = "./data/article.final.json";
const articlePage = document.getElementById("articlePage");
let article = [];
let single

//window.onload = () => {
const getArticle = async () => {

  const id = new URLSearchParams(window.location.search);
  const articleId = id.get('id');
  console.log(articleId)

  await fetch(localJson)
    .then((res) => res.json())
    .then((data) => {
      article = data.find((item) => {
        item.id === articleId
        return article

      })
      console.log(article)
    })
}
const loadArticle = async () => {


  articlePage.innerHTML = `
              <div class="container-fluid mt-5 ml-5">
                <div class="row gx-5">

                    <div class="col-md-8 mb-4">
                        <span class="badge bg-danger px-2 py-2 shadow-1-strong mb-3">Прекршени вести</span>
                        <h4><strong>${article.title}</strong></h4>
                        <p class="text-muted">
                            ${article.content}
                        </p>
                    </div>
                </div>

            </div>

  
  
  `;
};

(async () => {
  await getArticle()

  loadArticle()
})();

//main article

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




