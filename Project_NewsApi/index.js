

// API KEY -->  

console.log("Welcome to news app");

newsAccordian = document.getElementById('newsAccordian');

let source = 'bbc-news';
let apiKey = 'bfd32ab6365c4edaba09972338aa8dce';

const xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);
// xhr.open('GET', `https://newsapi.org/v2/top-headlines?source=${source}&apiKey=${apiKey}`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        console.log(json);
        let articles = json.articles;
        let newsStr = "";
        articles.forEach(function (element, index) {
            let str = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index + 1}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${index + 1}" aria-expanded="false" aria-controls="collapse${index + 1}"><b>Breaking News ${index+1}:</b>${element.title}
                                </button>
                            </h2>
                            <div id="collapse${index + 1}" class="accordion-collapse collapse" aria-labelledby="heading${index + 1}"
                                data-bs-parent="#newsAccordian">
                                <div class="accordion-body">${element["content"]}. <a href="${element["url"]}" target="_blank" style="text-decoration:none;">Read more here</a></div>
                            </div>
                        </div>`
            newsStr += str;
        });
        newsAccordian.innerHTML = newsStr;
        // console.log(articles);
    }
    else {
        console.log('Some error occured');
    }
}

xhr.send();