const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
};

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("searchResults");

function getMovieSearch() {
    const query = searchInput.value; // Obter o valor do campo de entrada
    const api_urlSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(api_urlSearch, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            searchResults.innerHTML = "";
            
            data.results.forEach(movieData => {
                searchResults.innerHTML += 
                    `<div class="searchedMovies" data-movie-id="${movieData.id}">
                    <img src="http://image.tmdb.org/t/p/w500${movieData.poster_path}" style="width: 250px; height: 350px; border: 2px solid black;">    
                    ${movieData.title}
                    </div>`;
            }); 
            
            const movieElements = document.querySelectorAll(".searchedMovies");

            movieElements.forEach(movieElement => {
                movieElement.addEventListener("click", function() {
                    const movieId = movieElement.getAttribute("data-movie-id");
                    window.location.href = `../3 Movie Page/movie.html?id=${movieId}`; // Redireciona para a página "movie.html" com o ID do filme como parâmetro
                });
            });

        })
        .catch(error => console.log(error));
}

searchButton.addEventListener("click", getMovieSearch);

// --------------pagination-------------------------

const ITEMS_PER_PAGE = 4;
let currentPage = 1;

function displayMovies(startIndex) {
searchResults.innerHTML = "";
const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, movieData.length);

for (let i = startIndex; i < endIndex; i++) {
    const movie = movieData[i];
    searchResults.innerHTML += `
        <div class="searchedMovies">
            <img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" style="width: 250px; height: 350px; border: 2px solid black;">    
            ${movie.title}
        </div>`;
}
}

function updatePagination() {
const totalPages = Math.ceil(movieData.length / ITEMS_PER_PAGE);
const pagination = document.querySelector
}