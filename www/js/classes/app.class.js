class App extends Base{

  constructor(){
    super();
    moment.locale('sv');
    this.load();
    $("body").tooltip({
      selector: '[data-toggle="tooltip"]'
    });
  }

  async load(){

    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Movie, Calendar, Order);

    this.movies = await JSON._load('movies.json');

    for(let obj of this.movies){
      obj.app = this;
    }

    this.showtime = await JSON._load('showtime.json');

    for(let i = 0; i < this.showtime.length; i++){
      for(let x = 0; x < this.movies.length; x++){
        if(this.showtime[i].film == this.movies[x].title){
          this.showtime[i].image = this.movies[x].images[2];
        }
      }
    }
    for(let x = 0; x < this.movies.length; x++){
      this.movies[x].gatherMovies();
    }



    this.comingMovies = await JSON._load('comingMovies.json');

    this.start();

  }

  // async renderNav(){
  //
  //   if(await this.userPage.isLoggedIn()){
  //     $('header').empty();
  //     this.navbar.render('header', '2');
  //     // $('header').append(this.navbar.template2());
  //   } else{
  //     this.navbar.render('header');
  //   }
  // }

  start(){
    // Create a navbar
    this.navbar = new Navbar(this);
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
    this.userPage = new UserPage();

    // Initiate handling of SPA push/pop-state
    this.popState = new PopStateHandler(this);

  }

}
