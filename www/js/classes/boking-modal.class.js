class bokingModal extends Base {
  constructor(auditorium, movieClass) {
    super();
    this.salong = new Salong(auditorium);
    this.movieClass = movieClass;
  }

  drawBokingModal() {
    $('main #boking-modal').remove();
    $('main').append(this.template());
    $('#boking-modal').modal();
  }
}
