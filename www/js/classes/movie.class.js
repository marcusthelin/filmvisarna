class Movie extends Base {
  constructor(){
    super();
    this.movies = [];
  }

  gatherMovies(){


    let date = new Date();

    date = new Date(date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate());

    for(let i = 0; i < this.app.showtime.length; i++){
      let m = this.app.showtime[i];
      if(m.film == this.title && date <= new Date(m.date)){
        this.movies.push(m)
      }
    }

    this.movies.length > 7 && (this.movies = this.movies.slice(0,7));
    // same but an alternative way of writing it
    // this.movies = this.movies.length > 7 ? this.movies.slice(0,7) : this.movies;

    console.log(this.movies);

  }


}
