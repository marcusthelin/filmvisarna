class Seat {
  constructor(x, y, seatNumber) {
    this.x = x;
    this.y = y;
    this.htmlTemplate = this.htmlSeatTemplate(x, y);
    this.seatNumber = seatNumber;
  }

  htmlSeatTemplate(x, y) {
    return `
      <rect x="${x}" y="${y}" rx="7" ry="7" width="40" height="40"
      class="vacant" />
    `
  }
}