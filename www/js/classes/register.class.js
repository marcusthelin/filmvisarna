class Register extends Base{
	constructor(){
		super();
		this.checkClick();
	}

	drawRegisterModal(){
		$('main #register-modal').remove();
		$('main').append(this.template());
		$('#register-modal').modal();
	}

	
	checkClick(){
		$(document).on('click', '.register', function(){
			let username = $('#name').val();
			let password = $('#password').val();
			console.log(username, password);
		});
	}

}
