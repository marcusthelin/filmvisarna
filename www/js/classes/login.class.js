class LogIn extends Base{
	constructor(){
		super();
		this.checkClickLogin();
	}

	click(event){
    if($(event.target).hasClass('skapa-konto')){
      this.register = new Register();
      this.register.drawRegisterModal();
    }
  }

	async load(){
		this.users = await JSON._load('users.json');
	}

	checkClickLogin(){
		let that = this;
		$(document).on('click', '.login', function(){
			let loginName = $('#userLogin').val();
			let loginPW = $('#userPW').val();

			if (loginName === that.username) {
				console.log('Jadå');
			}
			else{
				console.log('Nej');
			}

		});
	}

}
