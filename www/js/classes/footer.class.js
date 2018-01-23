class Footer extends Base{
	constructor(){
		super();
		this.footerFix();
		this.fixOnResize();
	}

	footerFix(){
    let height = $('footer').outerHeight() + 190;
    $('body').css({marginBottom: height});
  }

  fixOnResize(){
    let that = this;
    $(window).on('resize',function(){
      that.footerFix();
    });
  }
}