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

  getRow(seatNumber) {
    if (this.auditorium === "Lilla Salongen") {
      if (seatNumber > 0 && seatNumber <= 6){ return 1; }
      if (seatNumber > 6 && seatNumber <= 14){ return 2; }
      if (seatNumber > 14 && seatNumber <= 23){ return 3; }
      if (seatNumber > 23 && seatNumber <= 33){ return 4; }
      if (seatNumber > 33 && seatNumber <= 43){ return 5; }
      if (seatNumber > 43 && seatNumber <= 55){ return 6; }
    } else {
      if (seatNumber > 0 && seatNumber <= 8){ return 1; }
      if (seatNumber > 8 && seatNumber <= 17){ return 2; }
      if (seatNumber > 17 && seatNumber <= 27){ return 3; }
      if (seatNumber > 27 && seatNumber <= 37){ return 4; }
      if (seatNumber > 37 && seatNumber <= 47){ return 5; }
      if (seatNumber > 47 && seatNumber <= 57){ return 6; }
      if (seatNumber > 57 && seatNumber <= 69){ return 7; }
      if (seatNumber > 69 && seatNumber <= 81){ return 8; }
    }
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
    const seatNumber = $(event.target).attr("id");
    let index;
    let rowNumber;
    if (!($(event.target).hasClass('selected')) && $(event.target).is('rect')) {
      $(event.target).addClass('selected');
      rowNumber = this.getRow(seatNumber);
      this.selectedSeatNumbers.push({'RowNumber': rowNumber, 'SeatNumber': seatNumber});
    }
    else if ($(event.target).hasClass('selected')) {
      $(event.target).removeClass('selected');
      this.selectedSeatNumbers.some((seat) => {
        if (seat.SeatNumber === seatNumber) {
          index = this.selectedSeatNumbers.findIndex((oneSeat) => {return oneSeat.SeatNumber === seatNumber;});// おかしい
          console.log(index);
          this.selectedSeatNumbers.splice(index, 1);
          return true;
        }
      })
    }
    // show ticket information here temporary
    $('.ticket').empty();
    this.selectedSeatNumbers.sort((a, b) => { return a.SeatNumber - b.SeatNumber; });
    this.selectedSeatNumbers.forEach(seat => {
      $('.ticket').append(`<div>Rad: ${seat.RowNumber}, plats:  ${seat.SeatNumber}</div>`);
    })
    console.log(this.selectedSeatNumbers);
  }

}