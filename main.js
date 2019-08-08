
$(() => {
    $("#searchForm").on("submit", (e) => {

        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });

});

const getMovies = (searchText) => {
    axios.get("http://www.omdbapi.com/?apikey=904c907c&s=" + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = " ";
            $.each(movies, (index, movie) => {
                output += `
         <div class="col-md-3">
           <div class="well text-center">
           <img class="img-thumbnail" src="${movie.Poster}">
           <h5 class="mt-3 text-white"> ${movie.Title}</h5>
           <a onclick= "movieSelected('${movie.imdbID}')" class="btn btn-info" href="#">Movie Details </a>
           </div>
           </div>
         `

            });

            $("#movies").html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie.html";
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem("movieId");

    axios.get("http://www.omdbapi.com/?apikey=904c907c&i=" + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
      <div class="row">
      <div class="col-md-4">
      <img src="${movie.Poster}" class="img-thumbnail">
      </div>
      <div class="col-md-8">
            <h2 class="text-center mt-5 text-white"> ${movie.Title} </h2>
            <ul class="list-group mt-5">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre} </li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released} </li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated} </li>
                <li class="list-group-item"><strong>imdbRating:</strong> ${movie.imdbRating} </li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director} </li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer} </li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors} </li>
            </ul>
        </div>
      </div>
      <div class="row">
        <div class="well mb-5">
            <h3 class=" ml-3 mt-5 text-white" >Plot</h3>
           <p class="ml-3 text-white"> ${movie.Plot} <p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary ml-3">View IMDB</a>
            <a href="index.html" class="btn btn-info">Go Back to Search </a>
        </div>
      </div>
      `;
            $("#movie").html(output);
        })
        .catch((err) => {
            console.log(err);

        });

}