const localJson = "./data/article.final.json";
const articlePage = document.getElementById("articlePage");
let article = [];
let articles = [];
let data = [];

const defaultSource = "https://www.rt.com/rss/";

const loadArticle = async () => {
  const id = new URLSearchParams(window.location.search);
  const articleId = id.get("id");
  console.log(articleId);
  let res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" + defaultSource
  );
  let data = await res.json();
  articles = data.items;

  let article = articles.find((item) => item.pubDate == articleId);

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

loadArticle();
