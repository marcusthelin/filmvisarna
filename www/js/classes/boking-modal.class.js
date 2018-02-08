class bokingModal extends Base {
  constructor(auditorium, movieClass, dateTime) {
    super();
    this.salong = new Salong(auditorium);
    this.movieClass = movieClass;
    this.date = dateTime;
    this.tickets = [
      {type: "Ordinarie", price: 85, quantity: 0, total: 0},
      {type: "Pensionär", price: 75, quantity: 0, total: 0},
      {type: "Barn", price: 65, quantity: 0, total: 0}
    ];
  }

  drawBokingModal() {
    $('main #boking-modal').remove();
    this.render('main');
    $('#boking-modal').modal();
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

    }else{

      if($(event.target).hasClass('boking-btn')) {
        this.bookedTickets();
      }
    }

  }

  sortTickets(){
    let reservedTickets = this.tickets.filter(ticket => ticket.quantity > 0);
    $('.info-tickets').empty();
    reservedTickets.forEach(ticket => {
      $('.info-tickets').append(`<p>${ticket.quantity}st ${ticket.type} ${ticket.price} ${ticket.total} </p>`);
    });
    this.summary(reservedTickets);
  }

  summary(tickets){
    tickets.length == 0 ? $('.boking-btn').prop("disabled", true) : $('.boking-btn').prop("disabled", false);
    let price = 0;
    this.quantity = 0;
    $('.price').empty();
    for(let ticket of tickets){
      this.quantity += ticket.quantity;
      this.salong.quantity = this.quantity;
      price += ticket.total;
    }
    $('.price').text(`${price == 0 ? '' : price}`);
  }

  async bookedTickets(){
    let mNr = await JSON._load('session');
    let orderNr = 0;
    generateOrdernumber();
    function generateOrdernumber(){
      orderNr = Math.floor(Math.random() * 10000 + 1);
    }
    JSON._save('tickets.json', {
        orderNumber: orderNr,
        memberNumber: mNr,
        title: this.movieClass.title,
        date: this.date,
        auditorium: this.movieClass.auditorium,
        quantity: this.quantity
      }).then(function(){
      console.log('Saved!');
      let newOrder = new Order();
      newOrder.makeOrder();
    });
  }

}
