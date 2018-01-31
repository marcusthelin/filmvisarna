class UserPage extends Base{
	constructor(){
		super();
		this.user = "";
		this.memberNumber = 0;
	}

	async isLoggedIn(){
		let mNr = await JSON._load('session');
		let users = await JSON._load('users');

		for()
		console.log(mNr, users);
		return true;
	}

	setLogin(user){
		this.user = user.username;
		this.setSession(user.memberNumber);
	}

	setSession(mNr){
		JSON._save('session', mNr);
	}
}
