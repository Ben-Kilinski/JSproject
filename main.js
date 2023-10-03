const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQxZDY0ZTQyOWRiNGFiNDFjMDU1NGE4MGY0MDkwZiIsInN1YiI6IjY1MWE4NjEyZWE4NGM3MDEwYzEzOGFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QmBsb0LIN7ieO3P2dJwuiUZw74HQHwrhlTXcaVKNI7w'
    }
  };

const api_url = "https://www.themoviedb.org/movieapi_key=3141d64e429db4ab41c0554a80f4090f"

function getMovies() {
    fetch(api_url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
getMovies()



