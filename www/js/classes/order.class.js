class Order extends Base {
  constructor() {
    super();
  }
  
  makeOrder(orderNr, title, mNr, date, salong){
    let props = {
      orderNr: orderNr,
      orderInfo: {
        title: title,
        mNr: mNr,
        date: date,
        salong: salong
      },
      "⚙": "Order"
    }
    console.log(props)
    this.save(props);
  }

  async save(props){
    let allOrders = await JSON._load('orders');
    console.log(allOrders);
    allOrders.push(props);
    JSON._save('orders', allOrders);
  }
}
