const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
  };

const api_url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1"

const popMovies = document.getElementById("popMovies")

function getMovies() {
    fetch(api_url, options)
        .then(res => res.json())

        .then(data => {console.log(data)
            
            data.results.forEach(data => {
                popMovies.innerHTML += 
            `<div class="homeMovies">
            <img src="http://image.tmdb.org/t/p/w500${data.poster_path}" style="width: 250px; height: 350px; border: 2px solid black;">    
            ${data.title}
                <img>
            </div>`
            }); 
        })

        .catch(error => console.log(error));
}
getMovies()

//----------------------pagination------------------------------------------




