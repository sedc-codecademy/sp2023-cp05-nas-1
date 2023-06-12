
window.onload = () => {
  const localJson = "./data/article.final.json";
  const articlePage = document.getElementById("articlePage");



  const loadArticle = async () => {
    await fetch(localJson)
      .then((res) => res.json())
      .then((data) => {
        article = data[2];
      });
    console.log(article)

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
  loadArticle()
}
