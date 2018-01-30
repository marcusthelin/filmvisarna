class bokingModal extends Base {
  constructor() {
    super();
    this.seatHtml = [];
  }

  drawBokingModal() {
    $('main #boking-modal').remove();
    $('main').append(this.template());
    $('#boking-modal').modal();
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

// temporary code
let modal = new bokingModal();
const smallSalong = {
  1: 6,
  2: 8,
  3: 9,
  4: 10,
  5: 10,
  6: 12
};
const bigSalong = {
  1: 8,
  2: 9,
  3: 10,
  4: 10,
  5: 10,
  6: 10,
  7: 12,
  8: 12
};
modal.createSalong(bigSalong);
modal.renderSalong(bigSalong);