class Filmer extends Base {
	constructor(app){
		super();
		this.app = app;
		this.getMovies();
	}
  
  getMovies(){
  	this.schedule = [];
  	let today = moment().format('YYYY-MM-DD');
  	for(let days = 0; days < 7; days++){
			let date = moment().add(days, 'days').format("YYYY-MM-DD");
			let time = moment().format('LT');
  		this.movies = [this.app.showtime.filter(movie => movie.date == date && (movie.time > time || today != movie.date))];
			for(let i = 0; i< this.movies.length; i++){
				this.schedule.push(this.movies[i]);
			}
			console.log(this.schedule);
			this.movies = [];
  	}
  }
}
