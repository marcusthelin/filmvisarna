const SHOWTIME_JSON = 'showtime.json';
const TODAY = new Date();

class Calendar {
  constructor() {
    this.loadJson(SHOWTIME_JSON);
  }

  loadJson(file) {
    JSON._load(file).then((data) => {
      this.data = data;
    }).then(() => this.movieTableFactory());
  }

  headerFactory(todayOrTommorow) {
    return `
    <tr>
      <th scope="col" colspan=2 class="h4">${todayOrTommorow}</th>
    </tr>
    `
  }

  movieFactory(time, title) {
    return `
    <tr>
      <th scope="row">${time}</th>
      <td>${title}</td>
    </tr>
    `
  }

  movieTableFactory() {
    const movies = this.getMovies(TODAY);
    let tableForToday;
    let tableForTomorrow;
    movies[0].forEach((movie) => {
      tableForToday += this.movieFactory(movie.time, movie.film);
    });
    $('.today-table').html(tableForToday);

    movies[1].forEach((movie) => {
      tableForTomorrow += this.movieFactory(movie.time, movie.film);
    });
    $('.tomorrow-table').html(tableForTomorrow);
  }

  getMovies(date) {
    const schedule = [];

    let todayMovies = this.data.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate());
    schedule.push(todayMovies);

    let tomorrowMovies = this.data.filter(movie => movie.date == date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getDate()+1));
    schedule.push(tomorrowMovies);

    return schedule;
  }

  renderHTML() {
    return `
    <div class="col-lg-4">
      <div class="calendar">
        <table class="table table-hover table-sm">
          <thead>
            ${this.headerFactory('I dag')}
          </thead>
          <tbody class="today-table">
          </tbody>
          <thead>
            ${this.headerFactory('I morgon')}
          </thead>
          <tbody class="tomorrow-table">
          </tbody>
        </table>
      </div>
    </div>
    `;
  }
}