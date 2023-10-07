const API_KEY = "fbd8c3bc2c574bb0aad5287e49594be8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json(); 
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage){
            return;
        }
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone,article){
    // vars to copy data
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // filling data in card
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // date in reading format
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} : ${date}`;

    // click to open source link
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    });
}

let curSelectedLink = null;
function onNavClick(query){
    fetchNews(query);

    const navItem = document.getElementById(query);
    curSelectedLink?.classList.remove('active');
    curSelectedLink = navItem;
    curSelectedLink.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedLink?.classList.remove('active');
    curSelectedLink = null;
})

function reload(){
    window.location.reload();
}