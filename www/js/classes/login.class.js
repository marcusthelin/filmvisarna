class LogIn extends Base{
	constructor(app){
		super();
		this.app = app;
		this.checkClickLogin();
		this.load();
		this.loggedIn = false;
	}

	click(event){
    if($(event.target).hasClass('skapa-konto')){
      this.register = new Register();
      this.register.drawRegisterModal();
    }
  }

	async load(){
		this.users = await JSON._load('users.json');
		console.log('JSON loaded');
	}

	checkClickLogin(){
		let that = this;
		$(document).on('click', '.login', function(){
			let loginName = $('#userLogin').val();
			let loginPW = $('#userPW').val();

			for(let obj of that.users){

				if (loginName == obj.username ) {
					if(loginPW == obj.password){
						console.log('stämmer bra');
						that.loggedIn = true;
						$('header').empty();
						that.app.navbar.render('header');

					}
					break;
				}
				else{
					console.log('Nej');
				}
			}

		});
	}

}
