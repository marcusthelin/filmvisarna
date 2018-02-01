class UserPage extends Base{
	constructor(){
		super();
		this.user = "";
		this.memberNumber = 0;
		this.checkClickLogout();
	}

	/* When clicking logout, set the value in session.json to 0
	and change page to Startsida */
	checkClickLogout(){
		$(document).on('click', '.logout', function(){
			let session = JSON._load('session');
			session = 0;
			JSON._save('session', session);
			location.pathname = '/';
		});
	}


	/* Checks if the member number stored in session.json is the same
	as the member number of the user. Returns true for logged in */
	async isLoggedIn(){
		let mNr = await JSON._load('session');
		let users = await JSON._load('users');
		for(let obj of users){
			console.log(obj);
			if(obj.memberNumber == mNr){
				console.log('Found the right user!!');
				//Tell the name of the user to the class
				this.user = obj.username;
				this.memberNumber = obj.memberNumber;
				return true;
			} else {console.log('Not found');}
		}
	}

	/* Method that sets the current user as logged in. Variable "user" is coming
	from the LogIn class */
	setLogin(user){
		console.log('Current user', user);
		this.user = user.username;
		this.setSession(user.memberNumber);
	}

	/* Save the session(member number) to session.json */
	setSession(mNr){
		JSON._save('session', mNr);
	}
}
