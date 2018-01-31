class Register extends Base{
	constructor(){
		super();
		this.checkClickCreateUser();
		this.load();
	}


	async load(){
		this.users = await JSON._load('users.json');
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
			let memberNumber = Math.floor((Math.random() * 10000000) + 1);

			let newUser = {username: username, password: password, memberNumber: memberNumber};

			that.users.push(newUser);

			JSON._save('users.json', that.users);

			console.log(that.users);
		});


	}

}
