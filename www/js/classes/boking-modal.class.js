class bokingModal extends Base {
  constructor(auditorium) {
    super();
    this.salong = new Salong(auditorium);

  }

  drawBokingModal() {
    $('main #boking-modal').remove();
    $('main').append(this.template());
    $('#boking-modal').modal();
  }
}

