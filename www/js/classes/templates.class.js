class Templates {
	constructor(){
		this.header();
		this.footer();
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
			    <ul class="dropdown-menu dropdown-menu-right mt-1">
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
			        <a class="dropdown-item skapa" href="#">Skapa konto</a>
			        <a class="dropdown-item" href="#">Glömt ditt lösenord?</a>
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

  header(){
    $('header').html(`
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
        <div class="container">
          <img class="navbar-brand" href="#">
          <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
              &#9776;
          </button>
          <div class="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul class="nav navbar-nav">
              <li class="nav-item"><a href="/" class="nav-link pop">Startsida</a></li>
              <li class="nav-item"><a href="/filmer" class="nav-link pop">Filmer</a></li>
              <li class="nav-item"><a href="/boka" class="nav-link pop">Boka</a></li>
              <li class="nav-item"><a href="/biljetter" class="nav-link pop">Biljetter</a></li>
              <li class="nav-item"><a href="/omOss" class="nav-link pop">Om oss</a></li>
            </ul>
            ${this.login()}
          </div>
        </div>
      </nav>
    `);
  }

  startsida() {
    $('main').html(`
      <div class="container">
        <div class="row col-lg-12">
          <div id="carouselExampleSlidesOnly" class="carousel slide mt-2" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="/imgs/test1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="/imgs/test1.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="/imgs/test1.jpg" alt="Third slide">
              </div>
            </div>
          </div>
        </div>
        <h2 class="mt-2">Aktuella filmer på bio</h2>
        <div class="row mt-2">
          <div class="col-lg-8">
            <div class="row">
            <div class="card col-lg-6 border-0">
              <a href="/film1" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"></a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div class="card col-lg-6 border-0">
              <a href="/film2" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"></a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            </div>
            <div class="row">
            <div class="card col-lg-6 mt-2 border-0">
              <a href="/film3" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"><7a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div class="card col-lg-6 mt-2 border-0">
              <a href="/film4" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"></a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            </div>
            <div class="row">
            <div class="card col-lg-6 mt-2 border-0">
              <a href="/film5" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"></a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div class="card col-lg-6 mt-2 border-0">
              <a href="/film6" class"pop"><img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap"></a>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            </div>
          </div>
          ${this.calendarTable()}
        </div>
      </div>
    `);
  }


  filmer() {
    $('main').html(`
      <div class="container">
        <div class="row col-lg-12 mt-2">
          <div class="col-lg-8">
            <div class="media border">
              <a href="/film1" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid " src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading Film 1</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film1" role="button">Mer information</a>
            </div>
            <div class="media border mt-2">
              <a href="/film2" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading film 2</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film2" role="button">Mer information</a>
            </div>
            <div class="media border mt-2">
              <a href="/film3" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading film 3</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film3" role="button">Mer information</a>
            </div>
            <div class="media border mt-2">
              <a href="/film4" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading film 4</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film4" role="button">Mer information</a>
            </div>
            <div class="media border mt-2">
              <a href="/film4" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading film 5</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film5" role="button">Mer information</a>
            </div>
            <div class="media border mt-2">
              <a href="/film5" class="pop" data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
              <div class="media-body">
                <h5 class="mt-0">Media heading film 6</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
              <button type="button" class="btn btn-dark align-self-end mr-1">Boka</button>
              <a class="btn btn-dark align-self-end" href="/film6" role="button">Mer information</a>
            </div>
            </div>
          ${this.calendarTable()}
        </div>
      </div>
    `);
  }


  biljetter() {
    $('main').html(`
      <div class="container">
        <div class="row col-lg-12 mt-2">
          <div class="col-lg-8">
            <div class="biljett-info">
              <h2>Priser & Kort</h2>

              <h4>Kino</h4>
              <p>Kassan öppnar 30 minuter före första föreställning. Biljetterna är vanligtvis numrerade. Bokade biljetter måste hämtas senast 30 minuter före föreställningen. För Operaföreställningar och andra livesändningar gäller andra uthämtningstider.</p>
              <p><b>Ord pris:</b> 85kr</p>
              <p><b>Barn (under 12 år):</b> 65kr</p>
              <p><b>Pensionärer:</b> 85kr</p>

              <h4>Presentkort</h4>
              <p>Ge någon en trevlig present! Presentkort finns i olika valörer och du köper dom i kassan på Kino som öppnar 30 min före första föreställning. </p>

              <h4>Företagsbiljetter</h4>
              <p>Vi säljer även företagsbiljetter. Fast pris, berättigar till en biljett på ordinarie filmvisningar, mängdrabatt ges. För mer information och beställning kontakta vårt kontor på info@kino.nu</p>

              <h2>Åldersgränser på bio</h2>
              <p>Sedan första mars 2017 fungerar 15-årsgränsen på samma sätt som de andra åldersgränserna.</p>
              <p>Som vuxen räknas den som fyllt 18 år. </p>
              <p><b>Barntillåten:</b> inga begränsningar</p>
              <p><b>7 år:</b> barntillåten i sällskap med vuxen </p>
              <p><b>11 år:</b> tillåten från 7 år i sällskap med vuxen</p>
              <p><b>15 år:</b> tillåten från 11 år i sällskap med vuxen</p>
            </div>

          </div>
          ${this.calendarTable()}

        </div>
      </div>
     `);
  }

  omOss() {
    $('main').html(`
      <div class="container">
        <div class="row col-lg-12 mt-2">
          <div class="col-lg-8">
            <div class="info border">
              <p>Här kommer en ruta med information om Salongerna</p>
            </div>
            <div class="info border">
              <p>Här kommer en ruta med information om Godis och försäljning</p>
            </div>
            <div class="info border">
              <p>Här kommer en ruta med information om hur man hittar hit och lite mer info om oss</p>
            </div>

          </div>
          ${this.calendarTable()}

        </div>
      </div>
    `);
  }

  footer(){
    $('footer').html(`
	    <section class="row mt-3 mb-3">
	      <div class="col-lg-4 py-2">
	        <div class="row justify-content-center">
	          <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
	            <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
	            <p class="ml-5 pl-2">
	              Filmgatan 12 <br>
								12343, Malmö
	            </p>
	          </div>
	        </div>
	      </div>
	      <div class="col-lg-4 py-2 ">
	        <div class="row justify-content-center">
	          <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
	            <div>
	              <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
	              <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">info@filmvisarna.se</a></p>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div class="col-lg-4 py-2 ">
	        <div class="row justify-content-center">
	          <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
	            <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-12 33 21</span>
	            </p>
	          </div>
	        </div>
	      </div>
	    </section>
    `);
  }

  getMovie(nr){
    let that = this;
    JSON._load('movies.json').then(function(movie){
      new Movie(
          movie[nr].images,
          movie[nr].youtubeTrailers,
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
      '/film1': 0,
      '/film2': 1,
      '/film3': 2,
      '/film4': 3,
      '/film5': 4,
      '/film6': 5
    };
    let movieNr = numbers[url];
    this.getMovie(movieNr);
  }
}
