class bokingModal extends Base{
    constructor(){
        super();
    }

    drawBokingModal(){
       $('main #boking-modal').remove();
       $('main').append(this.template());
       $('#boking-modal').modal();
   }


}
