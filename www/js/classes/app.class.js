class App {

  constructor(){

    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Movie);

    // Load garments, add as a property, then start the app
    JSON._load('movies.json').then((movies)=>{
      this.movies = movies;
    });

    JSON._load('comingMovies.json').then((comingMovies)=>{
      this.comingMovies = comingMovies;
      this.start();
    });
  }

  start(){

    // Create a navbar
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');

    // Create a footer
    this.footer = new Footer();
    $('footer').empty();
    this.footer.render('footer');

    // Create pages
    this.startsidan = new Startsidan(this);
    this.filmer = new Filmer(this);
    this.biljetter = new Biljetter(this);
    this.omOss = new OmOss(this);

    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);

  }

}
