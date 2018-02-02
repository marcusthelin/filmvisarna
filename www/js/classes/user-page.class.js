class UserPage extends Base{
	constructor(){
		super();
		this.user = "";
		this.memberNumber = 0;
		this.checkClickLogout();
		this.currentUrl = location.pathname;
	}

	/* When clicking logout, set the value in session.json to 0
	and change page to Startsida */
	checkClickLogout(){

		$(document).on('click', '.logoutModalBtn', function(){
			console.log('Clicked');
			$('#exampleModal').appendTo('body').modal('show');
		});

		$(document).on('click', '.logout', function(e){
			let session = JSON._load('session');
			session = 0;
			JSON._save('session', session);
			$('#exampleModal').modal('hide');
		});
	}


	/* Checks if the member number stored in session.json is the same
	as the member number of the user. Returns true for logged in */
	async isLoggedIn(){
		let mNr = await JSON._load('session');
		let users = await JSON._load('users');
		for(let obj of users){
			if(obj.memberNumber == mNr){
				//Tell the name of the user to the class
				this.user = obj.username;
				this.memberNumber = obj.memberNumber;
				console.log('Current logged in user is', obj.username);
				return true;
				break;
			}
		}
		console.log('No user logged in');
	}

	/* Method that sets the current user as logged in. Variable "user" is coming
	from the LogIn class */
	setLogin(user){
		this.user = user.username;
		this.setSession(user.memberNumber);
	}

	/* Save the session(member number) to session.json */
	setSession(mNr){
		console.log(mNr);
		JSON._save('session', mNr);
	}
}
