class UserPage extends Base{
	constructor(app){
		super();
		this.clickEvents();
		this.app = app;
	}

	/* When clicking logout, set the value in session.json to 0
	and change page to Startsida */
	clickEvents(){
		let that = this;
		//Start of click events for logout
		$(document).on('click', '.logoutModalBtn', function(){
			$('#exampleModal').appendTo('body').modal('show');
		});

		$(document).on('click', '.logout', function(){
			let session = JSON._load('session');
			session = 0;
			JSON._save('session', session);
			$('#exampleModal').modal('hide');
		});
		//End of logout click click events

		//Click event that triggers cancelOrder()
		$(document).on('click', '.cancel-btn-card', function() {
			$('#cancel-order-modal').appendTo('body').modal('show');
			let orderNumber = parseInt($(this).parent().find('div.reserved-seats').attr('data-order-nr')); //Just get the ordernumber from card
			$('.cancel-order').click(() => {
				that.cancelOrder(orderNumber);
			});

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
				return true;
				break;
			}
		}
	}

	/* Method that sets the current user as logged in. Variable "user" is coming
	from the LogIn class */
	setLogin(user){
		this.user = user.personName;
		this.setSession(user.memberNumber);
	}

	/* Save the session(member number) to session.json */
	setSession(mNr){
		JSON._save('session', mNr);
	}

	async filterOrdersByDate(){
		$('main').empty();
		this.render('main');
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
			} else if((viewDate < today) && (viewDate != today)){
					//If booking's viewdate has past, save the order object to
					//order-history.json and remove it from order.json
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
	}

	renderCurrentBookings(currentUser){
		this.userCurrentBookings = [];

		this.currentBookings.filter(booking => {
			if(booking.orderInfo.mNr == currentUser){
				this.userCurrentBookings.unshift(booking);
			}
		});

		if(this.userCurrentBookings.length == 0){
			$('.aktuella').empty();
			$('#aktuella-heading').after('<h3>Du har inga aktuella bokningar.</h3>');
		} else {
			this.userCurrentBookings.render('.aktuella', '2');
			//Iterate through all the user's current bookings and get row and seat information
			for (let i = 0; i < this.userCurrentBookings.length; i++) {
				for(let seatObj of this.userCurrentBookings[i].orderInfo.seats){
					let reservedSeats = ('Rad: ' + seatObj.row.toString() + ', plats: ' + seatObj.seatNumbers.join(', ')); //Seats for one row
					$(`.reserved-seats[data-order-nr=${this.userCurrentBookings[i].orderNr}]`).append('<li>' + reservedSeats + '</li>');
				}
			}
		}
	}

	async renderHistoryBookings(currentUser){
		let oldBookings = await JSON._load('order-history');
		let userOldBookings = [];
		$('.order-history').find('h3').remove();

		oldBookings.filter(booking => {
			if(booking.orderInfo.mNr == currentUser){
				userOldBookings.push(booking);
			}
		});

		if(!(userOldBookings.length > 0)){
			$('.order-history > h2').after('<h3>Du har ingen historik.</h3>');
		} else userOldBookings.render('.order-history-list');
	}

	async cancelOrder(orderNumber){
		let index;
		let orders = await JSON._load('orders');
		//this.currentBooking is data from orders.json
		orders.filter(order => {
			if(order.orderNr == orderNumber){
				index = orders.indexOf(order);
				orders.splice(index, 1);
			}
		});
		await JSON._save('orders', orders)
		$('div.modal-backdrop').remove();
		this.filterOrdersByDate();
	}
}
