class Filmer extends Base {
	constructor(app){
		super();
		this.app = app;
		this.getMovies(new Date());
	}


	getMovies(date) {
		this.todayMovies = [];
		this.tomorrowMovies = [];
		this.dayAfterTomorrow = [];

    this.todayMovies = this.app.showtime.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate());
    this.tomorrowMovies = this.app.showtime.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getDate()+1));
		this.dayAfterTomorrow = this.app.showtime.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getDate()+2));

  }

}
