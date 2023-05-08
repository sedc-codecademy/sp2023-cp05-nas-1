//data
const localJson = "./data/article.final.json";
const defaultSource = "https://www.rt.com/rss/news/";

//page elements

const mainArticle = document.getElementById("mainArticle");

// data from rss feed

// load main article
const loadMain = async () => {
  await fetch(localJson)
    .then((res) => res.json())
    .then((data) => {
      article = data[2];
    });
  console.log(article);

  mainArticle.innerHTML = `
              <div class="container-fluid mt-5">
                <div class="row gx-5">
                    <div class="col-md-6 mb-4">
                        <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5"
                            data-mdb-ripple-color="light">
                            <img id="mainImg" src="${article.enclosure.link}" class="img-fluid" />
                            <a href="#!">
                                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <span class="badge bg-danger px-2 py-2 shadow-1-strong mb-3">Прекршени вести</span>
                        <h4><strong>${article.title}</strong></h4>
                        <p class="text-muted">
                            ${article.description}
                        </p>
                        <button type="button" class="btn btn-primary">Read more</button>
                    </div>
                </div>

                <!--Section: News of the day-->
            </div>

  
  
  `;
};
loadMain();
