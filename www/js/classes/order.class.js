class Order extends Base {
  constructor(orderNr, title, mNr, date, salong) {
    super();
    this.orderNr = orderNr;
    this.title = title
    this.mNr = mNr
    this.date = date
    this.salong = salong;
  }
  
  async save(){
    let allOrders = await JSON._load('orders');
    console.log(allOrders);
    let props = {
      orderNr: this.orderNr,
      orderInfo: {
        title: this.title,
        mNr: this.mNr,
        date: this.date,
        salong: this.salong
      },
      "⚙": "Order"
    }
    allOrders.push(props);
    JSON._save('orders', allOrders);
  }
}
