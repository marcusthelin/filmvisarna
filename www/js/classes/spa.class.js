class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!

  constructor() {
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());

  }

  addEventHandler() {

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click', 'a.pop', function(e) {

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

  changePage() {
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;

    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startsida',
      '/filmer': 'filmer',
      '/boka': 'boka',
      '/biljetter': 'biljetter',
      '/omOss': 'omOss',
      '/film1': 'film1'
    };

    // Call the right method
    let methodName = urls[url] || '/';
    this[methodName]();

  }

  startsida() {
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
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
          <div class="row mt-2">
            <div class="col-lg-8">
              <div class="row">
              <div class="card col-lg-6 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div class="card col-lg-6 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="card col-lg-6 mt-2 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div class="card col-lg-6 mt-2 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="card col-lg-6 mt-2 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div class="card col-lg-6 mt-2 border-0">
                <img class="card-img-top" src="/imgs/test2.jpg" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              </div>

            </div>
            <div class="col-lg-4">
              <div class="kalendarium border">
                <p>Kalendarium</p>
              </div>
            </div>

          </div>


        </div>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    `);
  }

  filmer() {
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <div class="row col-lg-12 mt-2">
            <div class="col-lg-8">
              <div class="media border">
                <a href="/film1" class="data-toggle="tooltip" data-placement="right" title="Mer information"><img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image"></a>
                <div class="media-body">
                  <h5 class="mt-0">Media heading Film 1</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
              <div class="media border mt-2">
                <img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">Media heading film 2</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
              <div class="media border mt-2">
                <img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">Media heading film 3</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
              <div class="media border mt-2">
                <img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">Media heading film 4</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
              <div class="media border mt-2">
                <img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">Media heading film 5</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>
              <div class="media border mt-2">
                <img class="d-flex mr-3 img-fluid" src="/imgs/test2.jpg" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">Media heading film 6</h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
              </div>

            </div>
            <div class="col-lg-4">
              <div class="kalendarium border">
                <p>Kalendarium</p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      `);
  }

  boka() {
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      `);
  }

  biljetter() {
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <div class="row col-lg-12 mt-2">
            <div class="col-lg-8">
              <div class="info border">
                <p>Här kommer en ruta med information om hur biljetterna fungerar</p>
              </div>

            </div>
            <div class="col-lg-4">
              <div class="kalendarium border">
                <p>Kalendarium</p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      `);
  }

  omOss() {
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
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
            <div class="col-lg-4">
              <div class="kalendarium border">
                <p>Kalendarium</p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      `);
  }
  film1(){
    $('body').html(`
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
          <div class="container">
            <img class="navbar-brand" href="#">
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                    &#9776;
                </button>
            <div class="collapse navbar-collapse" id="exCollapsingNavbar">
              <ul class="nav navbar-nav">
                <li class="nav-item"><a href="/" class="nav-link">Startsida</a></li>
                <li class="nav-item"><a href="/filmer" class="nav-link">Filmer</a></li>
                <li class="nav-item"><a href="/boka" class="nav-link">Boka</a></li>
                <li class="nav-item"><a href="/biljetter" class="nav-link">Biljetter</a></li>
                <li class="nav-item"><a href="/omOss" class="nav-link">Om oss</a></li>
              </ul>
              <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
                <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-1">
                    <li class="p-3">
                      <form class="form" role="form">
                        <div class="form-group">
                          <input id="emailInput" placeholder="Användarnamn" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <input id="passwordInput" placeholder="Lösenord" class="form-control form-control-sm" type="text" required="">
                        </div>
                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Logga in</button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <div class="row col-lg-12 mt-2">
            <div class="col-lg-8">
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src="/imgs/test1.jpg" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <!--Måste bestämma storleken på bilderna-->
                    <iframe width="690" height="431" src="https://www.youtube.com/embed/ej3ioOneTy8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="/imgs/test1.jpg" alt="Third slide">
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div class="border col-lg-12">
                <h2 class="text-center">En film av Ridley Scott</h2>
                <div class="om-film mt-2">
                  <p>An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.</p>
                </div>

                <div id="accordion" role="tablist">
                  <div class="card">
                    <div class="card-header" role="tab" id="headingOne">
                      <h5 class="mb-0">
                            <a class="text-dark" data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseOne">
                              Produktions Information
                            </a>
                          </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        <ul class="film-produkt-info">
                          <li><b>Land:</b> USA</li>
                          <li><b>Produktionsår:</b> 2015</li>
                          <li><b>Längd:</b> 144 min</li>
                          <li><b>Genre:</b> Äventyr, Sci-Fi, Drama</li>
                          <li><b>Distributör:</b> 20th Century Fox</li>
                          <li><b>Språk:</b> Engelska</li>
                          <li><b>Textning: </b> Svenska</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" role="tab" id="headingTwo">
                      <h5 class="mb-0">
                            <a class="collapsed text-dark" data-toggle="collapse" href="#collapseTwo" role="button" aria-expanded="false" aria-controls="collapseTwo">
                              Recensioner
                            </a>
                          </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                      <div class="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                        raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="imdb-info text-center">
                  <a target="blank" href="http://www.imdb.com/title/tt3659388/?ref_=nv_sr_1">Filmen på Imdb</a>
                </div>
              </div>

            </div>
            <div class="col-lg-4">
              <div class="kalendarium border">
                <p>Kalendarium</p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <footer class="container-fluid bg-light">
        <section class="row mt-3 mb-3">
          <div class="col-lg-4 py-2">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1"><span class="fa fa-address-card mr-2"></span><span class="d-none d-lg-inline">Adress:</span></p>
                <p class="ml-5 pl-2">
                  Fyrairadgatan 4<br> Fyrgatan 44<br> 44 044 Malmö
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-12 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <div>
                  <p class="mb-1 pr-2"><span class="fa fa-facebook mr-3"></span><a href="#">Möt oss på Facebook!</span></a></p>
                  <p class="mb-1 pr-2"><span class="fa fa-envelope mr-3"> </span><a href="#">us@fourinarow.se</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 py-2 ">
            <div class="row justify-content-center">
              <div class="col-11 col-md-7 col-lg-11 col-xl-10 color d-flex justify-content-center align-items-center myheight">
                <p class="mb-1 pr-2"><span class="fa fa-phone mr-3"></span>Telefon: 040-44 33 44</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      `);
  }

}

// Create an instance of the class
new PopStateHandler();
