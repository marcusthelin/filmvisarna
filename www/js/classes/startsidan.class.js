class Startsidan extends Base {
	constructor(app){
		super();
		this.app = app;
		this.callCarousel();
	}

	callCarousel(){
		$(document).ready(function() {
			$('#carouselExampleControls').carousel('cycle');
		});
	}
}
