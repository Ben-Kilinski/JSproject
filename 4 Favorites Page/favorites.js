// Autorizaçao API-----------------------
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
};

// Pega os favoritos do localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Seleciona o elemento onde os filmes favoritos serão exibidos
const favoritesList = document.getElementById("favorites-list");

// Função para remover um filme dos favoritos
function removeFromFavorites(movieId) {
    favorites = favorites.filter(id => id !== movieId); // Remove o filme do array
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Atualiza o localStorage
    document.getElementById(`movie-${movieId}`).remove(); // Remove o filme da lista visualmente
    console.log(`Filme ${movieId} removido dos favoritos`);
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>Nenhum filme nos favoritos</p>"; // Exibe mensagem se não restarem favoritos
    }
}

// Verifica se há filmes nos favoritos
if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>Nenhum filme nos favoritos</p>";
} else {
    let promises = favorites.map(movieId => {
        const api_urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3141d64e429db4ab41c0554a80f4090f&language=en-US`;

        // Faz a chamada para pegar os detalhes do filme e retorna uma promessa
        return fetch(api_urlMovie, options)
            .then(res => res.json())
            .then(movieData => {
                // Constrói o HTML para cada filme com o botão "Remove"
                return `
                    <div class="favorite-movie" id="movie-${movieId}">
                        <img src="http://image.tmdb.org/t/p/w200${movieData.poster_path}" alt="${movieData.title}">
                        <button class="remove-btn" onclick="removeFromFavorites('${movieId}')">Remove</button>
                    </div>
                `;
            });
    });

    // Aguarda todas as promessas serem resolvidas
    Promise.all(promises)
        .then(moviesHtml => {
            // Atualiza o DOM uma única vez com todos os filmes
            favoritesList.innerHTML = moviesHtml.join("");
        })
        .catch(error => console.log(error));
}

