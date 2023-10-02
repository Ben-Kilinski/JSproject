
function getMovies() {
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
        }
    }

    fetch("https://api.themoviedb.org/3/authentication", options)
     
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



  
  