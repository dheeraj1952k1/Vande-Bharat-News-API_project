// Configuration
const API_KEY = "a0f31e2a63b04c059411450785303572";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

// Fetch Data
async function fetchData(query) {
    try {
        const response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Unable to fetch news. Please try again later.');
    }
}

// Render News
function renderNews(articles) {
    const mainElement = document.querySelector('main');
    if (!articles || articles.length === 0) {
        mainElement.innerHTML = '<p>No articles found. Please try a different query.</p>';
        return;
    }

    const articlesHTML = articles.map(article => {
        if (!article.urlToImage) return '';
        return `
            <div class="card">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${article.urlToImage}" alt="${article.title}" loading="lazy" />
                    <h4>${article.title}</h4>
                    <div class="publishbyDate">
                        <p>${article.source.name}</p>
                        <span>&bull;</span>
                        <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div class="desc">${article.description || 'No description available.'}</div>
                </a>
            </div>
        `;
    }).join('');

    mainElement.innerHTML = articlesHTML;
}

// Event Listeners for Search
const searchFormDesktop = document.getElementById('searchForm');
const searchFormMobile = document.getElementById('searchFormMobile');

searchFormDesktop.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const articles = await fetchData(query);
        renderNews(articles);
    }
});

searchFormMobile.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInputMobile').value.trim();
    if (query) {
        const articles = await fetchData(query);
        renderNews(articles);
    }
});

// Handle Category Clicks
function handleCategoryClick(category) {
    fetchData(category).then(renderNews);
}

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menuBtn');
const mobileMenu = document.querySelector('.mobile');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Initial Fetch
fetchData('all').then(renderNews);
