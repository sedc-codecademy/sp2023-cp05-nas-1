const articlePage = document.getElementById("articlePage");
let articles = [];

const loadArticle = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get("source");
  const articleId = urlParams.get("id");

  let res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" + source
  );
  let data = await res.json();
  articles = await data.items;

  let article = articles.find((item) => item.pubDate == articleId);

  let articleToStore = JSON.stringify(article);
  localStorage.setItem(articleId, articleToStore);

  articlePage.innerHTML = `
      <div class="container-fluid mt-5 ml-5">
        <div class="row gx-5">
          <div class="col-md-8 mb-4">
            
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
