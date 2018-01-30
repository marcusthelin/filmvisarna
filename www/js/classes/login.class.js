class LogIn extends Base{
	constructor(){
		super();
	}

	click(event){
    if($(event.target).hasClass('skapa-konto')){
      this.register = new Register();
      this.register.drawRegisterModal();
    }
  }

}
