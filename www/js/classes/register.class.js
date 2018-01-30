class Register extends Base{
	constructor(){
		super();
	}

	drawRegisterModal(){
		$('main #register-modal').remove();
		$('main').append(this.template());
		$('#register-modal').modal();
	}

	click(event){
    if($(event.target).hasClass('register')){
      console.log('hej');
    }
  }

}