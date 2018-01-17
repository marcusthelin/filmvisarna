class Spa {

  // Note: Only instantiate PopStateHandler once!

  constructor() {
    // Create an instance of the Templates class
    this.templates = new Templates();
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

    // Remove the class active from all menu options
    $('nav li.nav-item').removeClass('active');

    //Add the class active to the right menu option
    // Need document ready function because of no page reloadings
    $(document).ready(function() {
      $(`nav li a[href="${url}"]`).closest('li.nav-item').addClass('active');
    });

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startsida',
      '/filmer': 'filmer',
      '/biljetter': 'biljetter',
      '/omOss': 'omOss',
      '/film/The_Martian': 'filmInfo',
      '/film/Call_me_by_your_name': 'filmInfo',
      '/film/Star_Wars:_The_Last_Jedi': 'filmInfo',
      '/film/Thor:_Ragnarok': 'filmInfo',
      '/film/Interstellar': 'filmInfo',
      '/film/The Incredibles': 'filmInfo'
    };

    // Call the right method
    let methodName = urls[url] || '/';
    //Because i moved all the methods to the Templates class
    // we need to first point to that class & then call the method from.
    if(!(methodName == '/')){
      $('main').html( this.templates[methodName]() );
    }
    window.scrollTo(0, 0);
  }
}
