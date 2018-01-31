class LogIn extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.checkClickLogin();
    this.load();
    this.loggedIn = false;
  }

  click(event) {
    if ($(event.target).hasClass('skapa-konto')) {
      this.register = new Register();
      this.register.drawRegisterModal();
    }
  }

  async load() {
    //This makes sure that we always have the json file loaded
    this.users = await JSON._load('users.json');
    console.log('JSON loaded');
  }

  /* Method that runs when login instance is made. Purpose of this method is
  to watch for click event */
  checkClickLogin() {
    let that = this;
		$(document).keyup(function(e){
			if (e.keyCode == 13) {
				$('.login').click();
			}
		});
    $(document).on('click', '.login', function() {
      let loginName = $('#userLogin').val();
      let loginPW = $('#userPW').val();

      //Iterate through this.users array
      for (let obj of that.users) {

        /* If the the object's username corresponds with our input value,
        check if the password is also correct and if so re-render navbar */
        if (loginName == obj.username) {
          if (loginPW == obj.password) {
            console.log('stämmer bra');
            that.loggedIn = true;
            $('header').empty();
            that.app.navbar.render('header');

          }
          break;
        } else {
          console.log('Nej');
        }
      }

    });
  }

}
