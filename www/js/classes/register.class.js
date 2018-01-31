class Register extends Base{
	constructor(){
		super();
		this.checkClickCreateUser();
		this.load();
	}

	//loads in the users.json file so we can save data to it
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
		//function so pressing enter works to register a new account
		$(document).keyup(function(e){
			if (e.keyCode == 13) {
				$('.register').click();
			}
		});
		$(document).on('click', '.register', function(){
			//makes it possible to take the values from the input fields and adds a random member number
			let username = $('#name').val();
			let password = $('#password').val();
			let memberNumber = Math.floor((Math.random() * 10000000) + 1);

			let newUser = {username: username, password: password, memberNumber: memberNumber};
			//pushes the collected data from the user to users which in turn saves it to JSON
			that.users.push(newUser);

			JSON._save('users.json', that.users);

			console.log(that.users);
		});


	}

}
