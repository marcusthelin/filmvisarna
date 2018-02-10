class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!

  constructor(app){

    this.app = app;
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

  addEventHandler(){

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click','a.pop',function(e){

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

   changePage(){
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
      '/': 'startsidan',
      '/biljetter': 'biljetter',
      '/om_oss': 'OmOss',
      '/filmer': 'calendar',
      '/mina_sidor': 'userPage',
      '/film/The_Martian': 'filmInfo',
      '/film/Call_Me_by_Your_Name': 'filmInfo',
      '/film/Star_Wars:_The_Last_Jedi': 'filmInfo',
      '/film/Thor:_Ragnarok': 'filmInfo',
      '/film/Interstellar': 'filmInfo',
      '/film/The_Incredibles': 'filmInfo',
      '/film/Downsizing': 'filmInfo',
      '/film/Three_Billboards_Outside_Ebbing,_Missouri': 'filmInfo',
      '/mina_sidor': 'userPage'
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    this.app.navbar.setActive(url);

    //Render correct navbar depending if you're logged in or not
    window.onload = () => this.renderCorrectNav();

    //Scroll to top of page
    window.scrollTo(0, 0);


  }

  startsidan(){
    $('title').text('Filmvisarna');
    $('.karusell').empty();
    $('main').empty();
    this.app.startsidan.render('.karusell', '2');
    this.app.startsidan.render('main');
    this.app.startsidan.callCarousel();
  }

  filmInfo(){
    let url = location.pathname;
    let numbers = {
      '/film/The_Martian': 0,
      '/film/Call_Me_by_Your_Name': 1,
      '/film/Star_Wars:_The_Last_Jedi': 2,
      '/film/Thor:_Ragnarok': 3,
      '/film/Interstellar': 4,
      '/film/The_Incredibles': 5,
      '/film/Downsizing': 6,
      '/film/Three_Billboards_Outside_Ebbing,_Missouri': 7
    };
    $('.karusell').empty();
    $('main').empty();
    this.app.movies[numbers[url]].render('main','3');
    $('title').text($('h2').text()+ ' - Filmvisarna');
  }

  biljetter(){
    $('.karusell').empty();
    $('main').empty();
    this.app.biljetter.render('main');
    $('title').text('Biljetter - Filmvisarna');
  }

  OmOss(){
    $('.karusell').empty();
    $('main').empty();
    this.app.omOss.render('main');
    $('title').text('Om oss - Filmvisarna');
  }

  calendar(){
    $('.karusell').empty();
    $('main').empty();
    this.app.startsidan.render('.karusell', '2');
    $('title').text('Filmer - Filmvisarna');
    this.app.filmer.render('main');
    this.app.startsidan.callCarousel();
  }

  async userPage(){
    //Need to check if user is logged in, else the user
    //can type /mina_sidor into the url
    if(await this.app.userPage.isLoggedIn()){
      $('main').empty();
      $('.karusell').empty();
      this.app.userPage.filterOrdersByDate(); //Run method that gets all orders the user have done
    } else{
      this.startsidan();
      $('.access-denied-modal').modal('show');
      setTimeout(() => {
        $('.access-denied-modal').modal('hide');
      }, 3000);
    }

  }

  async renderCorrectNav(){
    console.log('called!');
    if(await this.app.userPage.isLoggedIn()){
      $('header').empty();
      this.app.navbar.render('header', '2');
    } else if(!(await this.app.userPage.isLoggedIn())) {
      $('header').empty();
      await this.app.navbar.render('header')
    }
  }

}
