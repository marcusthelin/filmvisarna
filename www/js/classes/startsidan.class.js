class Startsidan extends Base {
	constructor(app){
		super();
		this.app = app;
	}

	callCarousel(){
		$(document).ready(function() {
			$('#carouselExampleControls').carousel('cycle');
		});
	}
}
