class Salong extends Base{
	constructor(auditorium){
		super();
		this.app = app;
    this.seatHtml = [];
    this.load().then(() => {
      this.salongSize = this.getSalongSize(auditorium);
      this.createSalong(this.salongSize);
      this.renderSalong();
    });
  }

  async load(){
  	//JSON._classes(Salong);　// this code make a infinite loop
  	this.salonger = await JSON._load('salonger.json');
  }

  getSalongSize(auditorium) {
    let salongSize = {};
    this.salonger.some(salong => {
      if (salong.name === auditorium){
        salongSize = salong.seatsPerRow;
        return true;
      }
    })
    return salongSize;
  }

	createSalong(salongObject) {
    // create all seats of the salong
    for (let line in salongObject) {
      // salongObject[line] is number of seats in one line
      this.seat = new Array(salongObject[line]);
      let y = 20 + 40 * line;
      // calculate distance from left side
      let _x = 235 - (salongObject[line] * 30 + 5 * (salongObject[line] - 1)) / 2;

      // create seats in one line
      for (let i = 0, x = _x; i < salongObject[line]; i++) {
        this.seat[i] = new Seat(x, y);
        this.seatHtml.push(this.seat[i].htmlTemplate);
        x += 35;
      }
    }
  }

  renderSalong() {
  const salong = `
    <svg width="470" height="500">
      ${this.seatHtml.join("")}
    </svg>
  `
  $('#salong').html(salong);
  }

}