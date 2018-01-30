class Register extends Base{
	constructor(){
		super();
		this.checkClick();
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


	checkClick(){
		let that = this;
		$(document).on('click', '.register', function(){
			let username = $('#name').val();
			let password = $('#password').val();

			let newUser = {username: username, password: password};

			that.users.push(newUser);

			JSON._save('users.json', that.users);

			console.log(that.users);





			// console.log(username, password);
			// console.log(this.users);
		});


	}


	// save(data){
	// 	this.users.push({
	// 		username: data.username,
	// 		password: data.password
	// 	});
	// 	JSON._save('users.json', {
	// 		users: this.users;
	// 	});
  //
	// 	console.log(this.users);
	// }

}
