class Register extends Base{
	constructor(){
		super();
		this.checkClickCreateUser();
		this.load();
	}

	drawRegisterModal(){
		$('main #register-modal').remove();
		$('main').append(this.template());
		$('#register-modal').modal();
	}


	checkClickCreateUser(){
		let that = this;
		$(document).on('click', '.register', function(){
			let username = $('#name').val();
			let password = $('#password').val();

			let newUser = {username: username, password: password};

			that.users.push(newUser);

			JSON._save('users.json', that.users);

			console.log(that.users);
		});


	}

}
