class App {

  constructor(){

    this.load();

  }

  async load(){

    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Movie, Calendar);

    this.movies = await JSON._load('movies.json');

    this.showtime = await JSON._load('showtime.json');

    for(let i = 0; i < this.showtime.length; i++){
      for(let x = 0; x < this.movies.length; x++){
        if(this.showtime[i].film == this.movies[x].title){
          this.showtime[i].image = this.movies[x].images[2];
        }
      }
    }

    this.comingMovies = await JSON._load('comingMovies.json');

    this.start();

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
