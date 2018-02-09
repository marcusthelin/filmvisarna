class Order extends Base {
  constructor() {
    super();
  }

  async makeOrder(){
    let ticket = await JSON._load('ticket');

    let orderNr = await JSON._load('latest-order') + 1;

    this.orderNr = orderNr;
    this.title = ticket.title;
    this.mNr = ticket.memberNumber;
    this.date = ticket.date;
    this.auditorium = ticket.auditorium;
    this.quantity = ticket.quantity;
    this.price = ticket.price;
    this.reservedSeats = [];
    ticket.seats.filter(seatObj => {
      let reservedRow = seatObj.row;
      let reservedSeats = seatObj.seatNumbers.join(', ');
      let reserved = {
        row: reservedRow,
        seats: reservedSeats
      }
      this.reservedSeats.push(reserved);
    })
    console.log('Reserved seats:', this.reservedSeats);
    this.getMovieInfo();



    ticket = null;
    JSON._save('ticket', ticket);
    JSON._save('latest-order', orderNr);

  }

  async getMovieInfo() {
    let movies = await JSON._load('movies');
    console.log('info', this.title);
    for(let obj of movies){
      if (this.title == obj.title) {
        console.log('found movie');
        this.movieImage = obj.images[0];
        console.log(this.movieImage);
      }
    }
    let props = {
      orderNr: this.orderNr,
      orderInfo: {
        title: this.title,
        mNr: this.mNr,
        date: this.date,
        salong: this.auditorium,
        quantity: this.quantity,
        seats: this.reservedSeats,
        price: this.price,
        image: this.movieImage
      },
      "⚙": "Order"
    }
    this.save(props);
  }

  async save(props){
    let allOrders = await JSON._load('orders');
    console.log(allOrders);
    allOrders.unshift(props);
    JSON._save('orders', allOrders);
  }
}
