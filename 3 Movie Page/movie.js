// Autorizaçao API-----------------------
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
};

// Base DOM e API links ---------------------
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const api_urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3141d64e429db4ab41c0554a80f4090f&language=en-US`;
const movieDetails = document.getElementById("movie-details");
const castApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

// Fetch movie-------------------------------------
fetch(api_urlMovie, options)
    .then(res => res.json())
    .then(movieData => {
        // Exibe os detalhes do filme na página.
        movieDetails.innerHTML = `
        <div class="movie-container">
            <div class="movie-image">    
                <img src="http://image.tmdb.org/t/p/w500${movieData.poster_path}">
            </div>
            <div class="movie-details">
                <h1>${movieData.title}</h1>
                <p>${movieData.overview}</p>
                <p>Release: ${movieData.release_date}</p>
                <p>Popularity: ${movieData.popularity}</p>
                <p>Avaliation: ${movieData.vote_average}</p>
                <p>Language: ${movieData.original_language}</p>
                <button class="like-button">like</button><br>
                <sec id="casting">Cast:</sec>
            </div>    
        </div>`;

        // ------- like button ---------
        const likeButton = document.querySelector(".like-button");
        likeButton.addEventListener("click", () => {
            let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Recupera favoritos ou inicializa um array vazio
            if (!favorites.includes(movieId)) { // Evita adicionar duplicatas
                favorites.push(movieId); 
                localStorage.setItem("favorites", JSON.stringify(favorites)); // Salva no localStorage
                console.log(`Filme ${movieId} adicionado aos favoritos`);
            } else {
                console.log('Filme já está nos favoritos');
            }
        });
    })
    .catch(error => console.log(error));

// Fetch actors-----------------------------------------
fetch(castApiUrl, options)
    .then(res => res.json())
    .then(castData => {
        const castList = castData.cast;
        const castString = castList.map(actor => actor.name).join(', ');
        const castElement = document.getElementById('casting');
        castElement.innerHTML = `Cast: ${castString}`;
    })
    .catch(error => console.log(error));
