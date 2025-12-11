const quoteList = document.getElementById("quote-list");
const searchInput = document.getElementById("search");

// LIVE QUOTES API
async function fetchQuotes() {
    try {
        const response = await fetch("https://api.quotable.io/quotes?limit=50");
        const data = await response.json();
        displayQuotes(data.results);
        return data.results;
    } catch (error) {
        quoteList.innerHTML = "<p style='color:red'>Failed to load quotes. Check your internet connection.</p>";
    }
}

let allQuotes = [];

function displayQuotes(quotes) {
    quoteList.innerHTML = "";
    quotes.forEach(q => {
        const div = document.createElement("div");
        div.className = "quote";
        div.innerHTML = `
            <p>"${q.content}"</p>
            <small>- ${q.author}</small>
        `;
        quoteList.appendChild(div);
    });
}

// Search quotes
searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allQuotes.filter(q =>
        q.content.toLowerCase().includes(term) ||
        q.author.toLowerCase().includes(term)
    );
    displayQuotes(filtered);
});

// Load everything
fetchQuotes().then(q => allQuotes = q);


