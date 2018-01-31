class bokingModal extends Base{
    constructor(movieClass){
        super();
        this.movieClass = movieClass;
        console.log(movieClass);
    }

    drawBokingModal(){
       $('main #boking-modal').remove();
       $('main').append(this.template());
       $('#boking-modal').modal();
   }


}
