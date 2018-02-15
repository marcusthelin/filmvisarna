class BookingModal extends Base {
  constructor(auditorium, movieClass, dateTime, title) {
    super();
    this.salong = new Salong(auditorium, dateTime, title);
    this.movieClass = movieClass;
    this.date = dateTime;
    this.tickets = [
      {type: "Ordinarie", price: 85, quantity: 0, total: 0},
      {type: "Pensionär", price: 75, quantity: 0, total: 0},
      {type: "Barn", price: 65, quantity: 0, total: 0}
    ];
  }

  drawBookingModal() {
    $('#booking-modal').remove();
    $('#register-modal').remove();
    this.render('main');
    $('#booking-modal').modal('show');
  }

  loopTickets(type){
    for(let ticket of this.tickets){
      if (ticket.type == type) {
        return ticket;
      }
    }
  }

  click(event){
    let person, inputValue, quantity;
    if($(event.target).hasClass('quantity-btn')){
      this.salong.removeAllSeat();
      person = $(event.target).data('ticket-type');
      inputValue = parseInt($(`#${person}`).text());

      if($(event.target).hasClass('plus-btn')){

        $(`#${person}`).text(inputValue + 1);
        this.loopTickets(person).total += this.loopTickets(person).price;

      }else{

        if(inputValue == 0){return;}
        $(`#${person}`).text(inputValue - 1);
        this.loopTickets(person).total -= this.loopTickets(person).price;

      }

      quantity = parseInt($(`#${person}`).text());
      this.loopTickets(person).quantity = quantity;
      this.sortTickets();
      $('#changeSeat').removeClass('d-none');

    }else{

      if($(event.target).hasClass('booking-btn')) {
        $('.booking-success').removeClass('d-none');
        $('.booking-btn').prop('disabled', true);
        $('.booking-btn').addClass('d-none');
        $('.close-booking-btn').text('Stäng');
        $('.btn-to-mypage').removeClass('d-none');
        this.bookedTickets();
      }
    }

  }

  sortTickets(){
    let reservedTickets = this.tickets.filter(ticket => ticket.quantity > 0);
    $('.total-price').empty();
    reservedTickets.forEach(ticket => {
      $('.total-price').append(`<p>${ticket.quantity}st ${ticket.type}  ${ticket.price} kr </p>`);
    });
    this.summary(reservedTickets);
  }

  summary(tickets){
    tickets.length == 0 ? $('.booking-btn').prop("disabled", true) : $('.booking-btn').prop("disabled", false);
    this.totalPrice = 0;
    this.quantity = 0;
    $('.price').empty();
    for(let ticket of tickets){
      this.quantity += ticket.quantity;
      this.salong.quantity = this.quantity;
      this.totalPrice += ticket.total;
    }
    $('.price').text(`${this.totalPrice == 0 ? '' : this.totalPrice} kr`);
  }

  async bookedTickets(){
    let mNr = await JSON._load('session');
    await JSON._save('ticket.json', {
        memberNumber: mNr,
        title: this.movieClass.title,
        date: this.date,
        auditorium: this.movieClass.auditorium,
        quantity: this.quantity,
        seats: this.salong.selectedSeats,
        price: this.totalPrice
      }).then(function(){
      let newOrder = new Order();
      newOrder.makeOrder(); //Create order based on information from ticket.json and the session's member number
    });
  }

}
