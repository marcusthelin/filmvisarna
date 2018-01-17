const SHOWTIME_JSON = 'showtime.json';
const TODAY = new Date('2018-02-22');

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
    let table;
    movies.forEach((movie) => {
      table += this.movieFactory(movie.time, movie.film);
    });
    $('.today-table').html(table);
  }

  getMovies(date) {
    const movies = [];
    this.data.forEach((movie) => {
      let movieDate = new Date(movie.date).getTime();
      if (date.getTime() === movieDate) {
        movies.push(movie);
      }
    });
    return movies;
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