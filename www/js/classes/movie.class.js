class Movie extends Base {
  constructor(){
    super();
    this.movies = [];
    this.storaSalongen = [];
    this.lillaSalongen = [];
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

    //Sort movies based on auditorium.
    for(let i = 0; i < this.movies.length; i++){
      if(this.movies[i].auditorium == "Stora Salongen"){
        this.storaSalongen.push(this.movies[i]);
      } else if(this.movies[i].auditorium == "Lilla Salongen"){
        this.lillaSalongen.push(this.movies[i]);
      }
    }

  }

  // getting which size of salon that was selected
  getAuditorium(date, time) {
    this.auditorium = '';
    this.movies.some(movie => {
      if (movie.date === date && movie.time === time) {
        this.auditorium = movie.auditorium;
        return true;
      }
    });
    return this.auditorium;
  }

  // want to change 'Boka' button from the below to calendar
  click3(event) {
    if ($(event.target).hasClass('list-group-item')) {
      const regexp = /(\d{4}-\d{2}-\d{2})\s\|\s(\d+\.\d{2})/;
      // get date and time ex.(2018-02-01 | 21.10) from $(event.target)[0].innerText
      const dateTime = $(event.target)[0].innerText;
      // ignore if there are not any screenings
      if (dateTime) {
        // ignore first element that contains entire matched string
        const [, date, time] = dateTime.match(regexp);
        this.bokingModal = new bokingModal(this.getAuditorium(date, time),this);
        this.bokingModal.drawBokingModal();
      }
    }
  }
}
