class Footer extends Base{
	constructor(){
		super();
		Footer.footerFix();
		this.fixOnResize();
	}

	static footerFix(){
    let height = $('footer').outerHeight() + 190;
    $('body').css({marginBottom: height});
  }

  fixOnResize(){
    $(window).on('resize',function(){
      Footer.footerFix();
    });
  }
}
