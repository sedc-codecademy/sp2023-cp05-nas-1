
const localJson = "./data/article.final.json";
const articlePage = document.getElementById("articlePage");
let article = [];

const defaultSource = "https://www.rt.com/rss/news/";

const loadArticle = async () => {
  const id = new URLSearchParams(window.location.search);
  const articleId = id.get('id');
  console.log(articleId);

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.rss2json.com/v1/api.json?rss_url=" + defaultSource,
    true
  );
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      let articles = data.items;
      // console.log(articles)

      article = articles.find((item) => item.pubDate == articleId);


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
    }
  };
  xhr.send();
};
loadArticle();
