class Templates {
	constructor(){
		$('header').html(this.header());
		$('footer').html(this.footer());
    this.skapaKonto();
	}

  calendarTable(){
    this.calendar = new Calendar();
    return this.calendar.renderHTML();
  }

	login(){
  	return `
	  	<ul class="nav navbar-nav flex-row justify-content-between ml-auto log">
			  <li class="dropdown order-1">
			    <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
			    <ul class="dropdown-menu dropdown-menu-right mt-1 bg-dark text-white">
			      <li class="p-3">
			        <form class="px-2 py-2">
			          <div class="form-group">
			            <label for="exampleDropdownFormEmail1">E-post:</label>
			            <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="e-post@example.com">
			          </div>
			          <div class="form-group">
			            <label for="exampleDropdownFormPassword1">Lösenord:</label>
			            <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Lösenord">
			          </div>
			          <button type="submit" class="btn btn-primary">Logga in</button>
			        </form>
			        <div class="dropdown-divider"></div>
			        <a class="dropdown-item skapa text-white" href="#">Skapa konto</a>
			        <a class="dropdown-item text-white" href="#">Glömt ditt lösenord?</a>
			      </li>
			    </ul>
			  </li>
			</ul>
  	`;
  }

  skapaKonto(){
    $(document).on('click', '.skapa', function(){
      new Modal(
        `Skapa Konto`,
        `
          <form class="form-horizontal" role="form">
            <div class="row">
              <div class="col-md-3 field-label-responsive">
                <label for="name">Användarnamn</label>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                    <input type="text" name="name" class="form-control" id="name"
                    placeholder="Användarnamn" required autofocus>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                    <!-- Put name validation error messages here -->
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 field-label-responsive">
                <label for="email">E-post</label>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                    <input type="text" name="email" class="form-control" id="email"
                    placeholder="you@example.com" required autofocus>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                    <!-- Put e-mail validation error messages here -->
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 field-label-responsive">
                <label for="password">Lösenord</label>
              </div>
              <div class="col-md-6">
                <div class="form-group has-danger">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                    <input type="password" name="password" class="form-control" id="password"
                    placeholder="Lösenord" required>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                    <i class="fa fa-close"> Example Error Message</i>
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 field-label-responsive">
                <label for="password">Upprepa lösenord</label>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem">
                      <i class="fa fa-repeat"></i>
                    </div>
                    <input type="password" name="password-confirmation" class="form-control"
                    id="password-confirm" placeholder="Lösenord" required>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i>Skapa konto</button>
              </div>
            </div>
          </form>
        `
      );
    });
  }

  getMovie(nr){
    let that = this;
    JSON._load('movies.json').then(function(movie){
      new Movie(
          movie[nr].images,
          movie[nr].youtubeTrailers,
					movie[nr].imdblinks,
          movie[nr].title,
          movie[nr].description,
          [`<b>Land:</b> ${movie[nr].productionCountries.join(', ')}`,
          `<b>Produktionsår:</b> ${movie[nr].productionYear}`,
          `<b>Längd</b> ${movie[nr].length}`,
          `<b>Genre:</b> ${movie[nr].genre}`,
          `<b>Distributör:</b> ${movie[nr].distributor}`,
          `<b>Språk:</b> ${movie[nr].language}`,
          `<b>Textning:</b> ${movie[nr].subtitles}`,
          `<b>Regissör:</b> ${movie[nr].director}`,
          `<b>Skådespelare:</b> ${movie[nr].actors.join(', ')}`],
          movie[nr].reviews,
          that
      );
    });
  }

  filmInfo(){
    let url = location.pathname;
    let numbers = {
      '/film/The_Martian': 0,
      '/film/Call_Me_by_Your_Name': 1,
      '/film/Star_Wars:_The_Last_Jedi': 2,
      '/film/Thor:_Ragnarok': 3,
      '/film/Interstellar': 4,
      '/film/The_Incredibles': 5
    };
    let movieNr = numbers[url];
    this.getMovie(movieNr);
  }
}
