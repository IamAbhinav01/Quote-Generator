const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//get quotes from api
let apiQuotes = [];

function showloading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    showloading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author ? quote.author : "Unknown";
    if (quote.text > 50) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes(topic = "life") {
    showloading();
    const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {}
}
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

//Event Listners
newBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
//on load
getQuotes();
