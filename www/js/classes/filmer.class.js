class Filmer extends Base {
	constructor(app){
		super();
		this.app = app;
		this.getMovies(new Date());
		this.format = new Intl.DateTimeFormat("sv", {weekday:"long", day:"numeric", month: "long" });
	}


	getMovies(date) {
		this.schedule = [];
		for(let days = 0; days< 7; days++){
			this.movies = [this.app.showtime.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getDate()+days))];
			for(let i = 0; i< this.movies.length; i++ ){
				this.schedule.push(this.movies[i]);
			}
			this.movies = [];
		}
  }

}
