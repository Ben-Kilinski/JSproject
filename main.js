
const moviesData = getMovies()

function getMovies() {
    fetch("https://moviesminidatabase.p.rapidapi.com/movie/id/%7Bmovie_id%7D/cast/")
     
        .then(response => {
            console.log(response); 
            return response.json();
        })

        .then(data => {
            const movieList = document.getElementById("movieList");
            movieList.innerHTML = `<p>${data.value}</p>`
        })

        .catch(error => console.log(error))
}
