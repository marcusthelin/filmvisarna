class Movie extends Base {
  constructor(){
    super();
    this.movies = [];
    this.storaSalongen = [];
    this.lillaSalongen = [];
  }


  gatherMovies(){

    let date = moment().format('YYYY-MM-DD');
    let time = moment().format('LT');


    for(let i = 0; i < this.app.showtime.length; i++){
      let m = this.app.showtime[i];
      if(m.film == this.title && date <= m.date && time < m.time){
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
      if (moment(movie.date).format('ddd DD MMM') === date && movie.time === time) {
        this.auditorium = movie.auditorium;
        return true;
      }
    });
    return this.auditorium;
  }

  // want to change 'Boka' button from the below to calendar
  click3(event) {
    if ($(event.target).hasClass('boka-btn')) {
      const regexp = /([a-zåäö]{3}\s\d{2}\s[a-zåäö]{3})\,\s(\d{2}\:\d{2})/;
      /*/(\w{3}\s\d{2}-\d{2})\s\|\s(\d+\.\d{2})/;*/
      // get date and time ex. tis 12 feb, 21:10 from $(event.target)[0].innerText
      this.dateTime = $(event.target)[0].innerText;
      // ignore if there are not any screenings
      if (this.dateTime) {
        // ignore first element that contains entire matched string
        const [,date, time] = this.dateTime.match(regexp);
        this.bokingModal = new bokingModal(this.getAuditorium(date, time), this, this.dateTime, this.title);
        this.bokingModal.drawBokingModal();
      }
    }
  }
}
