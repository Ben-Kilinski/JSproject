// Autorizaçao API-----------------------
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
};

// Pega os favoritos do localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Seleciona o elemento onde os filmes favoritos serão exibidos
const favoritesList = document.getElementById("favorites-list");

// Verifica se há filmes nos favoritos
if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>Nenhum filme nos favoritos</p>";
} else {
    let htmlContent = ''; // Variável para armazenar o conteúdo HTML

    favorites.forEach(movieId => {
        const api_urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3141d64e429db4ab41c0554a80f4090f&language=en-US`;

        // Faz a chamada para pegar os detalhes do filme
        fetch(api_urlMovie, options)
            .then(res => res.json())
            .then(movieData => {
                // Constrói o HTML para cada filme
                htmlContent += `
                    <div class="favorite-movie">
                        <img src="http://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}">
                        <h2>${movieData.title}</h2>
                        <p>${movieData.overview}</p>
                        <p>Release: ${movieData.release_date}</p>
                    </div>
                `;

                // Atualiza o DOM apenas após todos os filmes serem processados
                favoritesList.innerHTML = htmlContent;
            })
            .catch(error => console.log(error));
    });
}
