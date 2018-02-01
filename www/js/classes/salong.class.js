class Salong extends Base{
	constructor(auditorium){
		super();
		this.app = app;
    this.seatHtml = [];
    this.auditorium = auditorium;
    this.load().then(() => {
      this.salongSize = this.getSalongSize(auditorium);
      this.createSalong(this.salongSize);
      this.renderSalong();
      $(window).resize(this.scaleSalong);
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

  getMaxSeatNumber(line, salongObject) {
    if (this.auditorium === "Lilla Salongen") {
      switch(line) {
        case "1": return 6;
        case "2": return 14;
        case "3": return 23;
        case "4": return 33;
        case "5": return 43;
        case "6": return 55;
      }
    } else {
      switch(line) {
        case "1": return 8;
        case "2": return 17;
        case "3": return 27;
        case "4": return 37;
        case "5": return 47;
        case "6": return 57;
        case "7": return 69;
        case "8": return 81;
      }
    }
  }

	createSalong(salongObject) {
    // create all seats of the salong
    for (let line in salongObject) {
      // salongObject[line] is number of seats in one line
      this.seat = new Array(salongObject[line]);
      const y = 20 + 50 * line;
      // calculate distance from left side
      const _x = 400 - (salongObject[line] * 40 + 5 * (salongObject[line] - 1)) / 2;

      const maxSeatNumber = this.getMaxSeatNumber(line);
      // create seats in one line
      for (let i = 0, x = _x, seatNumber = maxSeatNumber;
          i < salongObject[line];
          i++, seatNumber--) {
        this.seat[i] = new Seat(x, y, seatNumber);
        this.seatHtml.push(this.seat[i].htmlTemplate);
        x += 45;
      }
    }
  }

  renderSalong() {
  const salong = `
    <svg width="800" height="800">
      ${this.seatHtml.join("")}
    </svg>
  `
  $('#salong').html(salong);
  }

  scaleSalong() {
    let orgW = 800,
        orgH = 800;
    let w = $(window).width() - $("#salong").offset().left;
    let h = $(window).height();
    w -= 20 * 2;
    h -= 20 * 2;
    const wScale = w / orgW;
    const hScale = h / orgH;
    let scaling = Math.min(wScale, hScale);1
    scaling > 1 && (scaling = 1);

    $('#salong').css('transform', `scale(${scaling})`);
    $('#salong-holder').width(orgW * scaling);
    $('#salong-holder').height(orgH * scaling);
  }

}