class Salong extends Base{
	constructor(app){
		super();
		this.app = app;
		this.seatHtml = [];
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

  renderSalong(salongObject) {
  const salong = `
    <svg width="470" height="500">
      ${this.seatHtml.join("")}
    </svg>
  `
  $('#salong').html(salong);
  }

}