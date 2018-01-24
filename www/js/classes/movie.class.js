class Movie extends Base {
  constructor(){
    super();
    this.movies = [];
  }

  gatherMovies(){


    let date = new Date();

    date = date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate()



    let i = 0;
    for(i; i < this.app.showtime.length; i++){
      if(this.app.showtime[i].film == this.title && this.app.showtime[i].date == date){
        for(let x = i; x < this.app.showtime.length; x++){
          if(this.app.showtime[x].film == this.title){
            this.movies.push(this.app.showtime[x])
          }
        }
      }
    }
  }

}
