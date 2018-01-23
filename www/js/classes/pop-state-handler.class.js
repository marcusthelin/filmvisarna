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
      '/filmer': 'filmer',
      '/film/The_Martian': 'filmInfo',
      '/film/Call_Me_by_Your_Name': 'filmInfo',
      '/film/Star_Wars:_The_Last_Jedi': 'filmInfo',
      '/film/Thor:_Ragnarok': 'filmInfo',
      '/film/Interstellar': 'filmInfo',
      '/film/The_Incredibles': 'filmInfo'
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    this.app.navbar.setActive(url);

    //Scroll to top of page
    window.scrollTo(1, 1);
  }

  startsidan(){
    $('.karusell').empty();
    $('main').empty();
    this.app.startsidan.render('.karusell', '2');
    this.app.startsidan.render('main');
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
    $('.karusell').empty();
    $('main').empty();
    this.app.movies[numbers[url]].render('main','3');
  }

  biljetter(){
    $('.karusell').empty();
    $('main').empty();
    this.app.biljetter.render('main');
  }

  OmOss(){
    $('.karusell').empty();
    $('main').empty();
    this.app.omOss.render('main');
  }

  filmer(){
    $('.karusell').empty();
    $('main').empty();
    this.app.filmer.render('main');
  }
  
}
