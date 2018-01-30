class bokingModal extends Base {
  constructor() {
    super();
    this.load();
    this.salong = new Salong();
  }

  async load(){
  	JSON._classes(Salong);
  	this.salonger = await JSON._load('salonger.json');
    this.salong.createSalong(this.salonger[0].seatsPerRow);
    this.salong.renderSalong(this.salonger[0].seatsPerRow);
  }

  drawBokingModal() {
    $('main #boking-modal').remove();
    $('main').append(this.template());
    $('#boking-modal').modal();
  }

}

