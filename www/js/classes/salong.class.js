class Salong extends Base {
	constructor(auditorium){
		super();
		this.app = app;
    this.seatHtml = [];
    this.auditorium = auditorium;
    this.selectedSeatNumbers = [];
    this.load().then(() => {
      this.salongSize = this.getSalongSize(auditorium);
      this.createSalong(this.salongSize);
      this.render('#salong');
      $(window).resize(this.scaleSalong);
    });
  }

  async load(){
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

  getMaxSeatNumber(row) {
    if (this.auditorium === "Lilla Salongen") {
      switch(row) {
        case "1": return 6;
        case "2": return 14;
        case "3": return 23;
        case "4": return 33;
        case "5": return 43;
        case "6": return 55;
      }
    } else {
      switch(row) {
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
    for (let row in salongObject) {
      // salongObject[row] is number of seats in one row
      this.seat = new Array(salongObject[row]);
      const y = 20 + 50 * row;
      // calculate distance from left side
      const distanceFromLeft = 400 - (salongObject[row] * 40 + 5 * (salongObject[row] - 1)) / 2;

      const maxSeatNumber = this.getMaxSeatNumber(row);
      // create seats in one row
      for (let i = 0, x = distanceFromLeft, seatNumber = maxSeatNumber;
          i < salongObject[row];
          i++, seatNumber--) {
        this.seat[i] = new Seat(x, y, seatNumber);
        this.seatHtml.push(this.seat[i].htmlTemplate);
        x += 45;
      }
    }
  }

  template() {
  const salong = `
    <svg width="800" height="800">
      ${this.seatHtml.join("")}
    </svg>
  `
  return salong;
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

  mouseover(event) {
    if ($(event.target).is('rect') && $(event.target).hasClass('vacant')) {
      $(event.target).removeClass('vacant');
      $(event.target).addClass('mouseentered');
    }
  }

  mouseout(event) {
    if ($(event.target).is('rect')) {
      $(event.target).removeClass('mouseentered');
      $(event.target).addClass('vacant');
    }
  }

  click(event) {
    const id = $(event.target).attr("id");
    let index;
    if (!($(event.target).hasClass('selected')) && $(event.target).is('rect')) {
      $(event.target).addClass('selected');
      this.selectedSeatNumbers.push(id);
    }
    else if ($(event.target).hasClass('selected')) {
      $(event.target).removeClass('selected');
      this.selectedSeatNumbers.some((number) => {
        if (number === id) {
          index = this.selectedSeatNumbers.indexOf(number);
          this.selectedSeatNumbers.splice(index, 1);
          return true;
        }
      })
    }
    console.log(this.selectedSeatNumbers);
  }

}