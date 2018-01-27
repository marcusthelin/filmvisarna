class Filmer extends Base {
	constructor(app){
		super();
    this.app = app;
    this.getMovies(new Date());
    this.format = new Intl.DateTimeFormat("sv", {weekday:"long", day:"numeric", month: "long" });
	}

	getMovies(date) {
    // set time at 00:00:00, will be calculated by based on this time
    const baseDate = new Date(date.setHours(0, 0, 0, 0));
    const oneDayInMs = 24 * 60 * 60 * 1000;
    this.schedule = [];

    // collect movies within 7 days
    // this.schedule[0] is today's movies
    // this.schedule[1] is tomorrow's movies
    for (let i = 0; i < 7; i++) {
      this.schedule[i] = this.app.showtime.filter(movie => {
        const movieDate = new Date(movie.date);
        const diffTime = movieDate.getTime() - baseDate.getTime();
        return diffTime >= oneDayInMs * i && diffTime < oneDayInMs * (i + 1);
      });
    }
  }

}
