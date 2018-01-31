class LogIn extends Base{
	constructor(){
		super();
		this.checkClickLogin();
		this.load();
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
					}
					$('header').empty();
					${}
					break;
				}
				else{
					console.log('Nej');
				}
			}

		});
	}

}
