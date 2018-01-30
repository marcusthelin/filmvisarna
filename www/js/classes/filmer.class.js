class Filmer extends Base {
	constructor(app){
		super();
		this.app = app;
		this.getMovies();
	}
  
  getMovies(){
  	this.schedule = [];
  	for(let days = 0; days < 7; days++){
			let date = moment().add(days, 'days').format("YYYY-MM-DD");
  		this.movies = [this.app.showtime.filter(movie => movie.date == date)];
			for(let i = 0; i< this.movies.length; i++){
				this.schedule.push(this.movies[i]);
			}
			this.movies = [];
  	}
  }

}
