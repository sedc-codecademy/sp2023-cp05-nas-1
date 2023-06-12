
let articleId; // Variable to store the article ID
let article; // Variable to store the article object

export function setArticleId(id) {
  articleId = id;
}

export function setArticle(data) {
  article = data;
}

export function getArticleId() {
  return articleId;
}

export function getArticle() {
  return article;
}
