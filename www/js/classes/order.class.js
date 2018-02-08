class Order extends Base {
  constructor() {
    super();
  }
  
  async makeOrder(orderNr, title, mNr, date, salong){
    let ticket = await JSON._load('tickets');
    
    let props = {
      orderNr: ticket.orderNumber,
      orderInfo: {
        title: ticket.title,
        mNr: ticket.memberNumber,
        date: ticket.date,
        salong: ticket.auditorium,
        quantity: ticket.quantity
      },
      "⚙": "Order"
    }
    console.log(props)
    this.save(props);
    ticket = null;
    JSON._save('tickets', ticket);
  }

  async save(props){
    let allOrders = await JSON._load('orders');
    console.log(allOrders);
    allOrders.push(props);
    JSON._save('orders', allOrders);
  }
}
