let spa;

JSON._load('movies.json').then(function(movie){
  Templates.movies = movie;
  spa = new Spa();
});
