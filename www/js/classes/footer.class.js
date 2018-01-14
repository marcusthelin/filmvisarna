class Footer {
  constructor() {
    this.footerFix();
    this.fixOnResize();
  }


  footerFix(){
    let height = $('footer').height() + 40;
    $('body').css({marginBottom: height});
  }

  fixOnResize(){
    let that = this;
    $(window).on('resize',function(){
      that.footerFix();
    });
  }
}

const fixMe = new Footer();
