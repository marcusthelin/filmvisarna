class Seat {
  constructor(x, y, seatNumber) {
    this.x = x;
    this.y = y;
    this.htmlTemplate = this.htmlSeatTemplate(x, y);
    this.seatNumber = seatNumber;
  }

  htmlSeatTemplate(x, y) {
    return `
      <rect x="${x}" y="${y}" rx="7" ry="7" width="30" height="30"
      style="fill:black;stroke:black;stroke-width:2;opacity:0.3" />
    `
  }
}