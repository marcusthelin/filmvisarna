class Modal{
  constructor(title, body, btn = 'Stäng'){
    this.title = title;
    this.body = body;
    this.btn = btn;
    this.drawModal();
  }

  drawModal(){
    $('main #main-modal').remove();
    $('main').append(`
      <div class="modal fade" id="main-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title text-danger">${this.title}</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <a href="${location.pathname}">&times;</a>
            </button>
            </div>
            <div class="modal-body mx-4">
              ${this.body}
            </div>
            <div class="modal-footer">
              <a href="${location.pathname}"><button type="button" class="btn btn-danger">${this.btn}</button></a>
            </div>
          </div>
        </div>
      </div>
    `);
   $('#main-modal').modal();
  }
}