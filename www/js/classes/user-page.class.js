class UserPage extends Base{
	constructor(){
		super();
		this.checkClickLogout();
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
				this.user = obj.personName;
				this.memberNumber = obj.memberNumber;
				console.log('Current logged in user is', obj.username);
				console.log('User: ', obj);
				$('.tooltipBook').attr('data-original-title', 'Boka');
				$('.tooltipBook button').removeClass('disabled');
				return true;
				break;
			}
		}
		console.log('No user logged in');
	}

	/* Method that sets the current user as logged in. Variable "user" is coming
	from the LogIn class */
	setLogin(user){
		this.user = user.personName;
		this.setSession(user.memberNumber);
	}

	/* Save the session(member number) to session.json */
	setSession(mNr){
		console.log(mNr);
		JSON._save('session', mNr);
	}

	async filterOrdersByDate(){
		let today = moment(new Date(), 'ddd DD, LT');
		let userOrders = await JSON._load('orders');
		let currentUser = await JSON._load('session');
		let index;
		this.currentBookings = [];
		this.historyBookings = await JSON._load('order-history');
		userOrders.filter(order => {
			let viewDate = moment(order.orderInfo.date,  'ddd DD, LT');
			//If the booking's view date is today or later, add to this.currentBookings array
			if(viewDate >= today){
				this.currentBookings.unshift(order);
			} 
				//If booking's viewdate has past, save the order object to
				//order-history.json and remove it from order.json
				else if(viewDate < today){
				this.historyBookings.unshift(order);
				index = userOrders.indexOf(order);
				userOrders.splice(index, 1);
				JSON._save('order-history', this.historyBookings);
				JSON._save('orders', userOrders);
			}
			
		});

		//Functions that renders the user's orders
		this.renderHistoryBookings(currentUser);	
		this.renderCurrentBookings(currentUser);
			
		console.log('Current', this.currentBookings);
		console.log('Past', this.historyBookings);

	}

	renderCurrentBookings(currentUser){
		let userCurrentBookings = [];

		this.currentBookings.filter(booking => {
			if(booking.orderInfo.mNr == currentUser){
				userCurrentBookings.unshift(booking);
			}
		});

		if(!(userCurrentBookings.length > 0)){
			$('#aktuella-heading').after('<h3>Du har inga aktuella bokningar.');	
		} else userCurrentBookings.render('.aktuella', '2');
	}

	async renderHistoryBookings(currentUser){
		let oldBookings = await JSON._load('order-history');
		let userOldBookings = [];

		oldBookings.filter(booking => {
			if(booking.orderInfo.mNr == currentUser){
				userOldBookings.unshift(booking);
			}
		});

		if(!(userOldBookings.length > 0)){
			$('.order-history > h2').after('<h3>Du har ingen historik.');
		} else userOldBookings.render('.order-history-list');
	}
}
