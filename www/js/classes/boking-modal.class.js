class bokingModal extends Base {
  constructor(auditorium, movieClass) {
    super();
    this.salong = new Salong(auditorium);
    this.movieClass = movieClass;
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
        person = $(event.target).data('ticket-type');
        inputValue = parseInt($(`#${person}`).text());
    }
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
  }

  sortTickets(){
    let reservedTickets = this.tickets.filter(ticket => ticket.quantity > 0);
    $('.info-tickets').empty();
    $('.price').empty();
    reservedTickets.forEach(ticket => {
      $('.info-tickets').append(`<p>${ticket.quantity}st ${ticket.type} ${ticket.price} ${ticket.total} </p>`);
    });
  }
}
