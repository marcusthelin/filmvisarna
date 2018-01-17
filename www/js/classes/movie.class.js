class Movie{
  constructor(img, trailer, title, description, facts, reviews, templatesClass){
    this.img = img;
    this.trailer = trailer;
    this.title = title;
    this.description = description;
    this.facts = '<li>' + facts.join('</li><li>') + '</li>';
    this.reviews = reviews;
    this.templatesClass = templatesClass;
    this.drawTemplate();
  }


  drawTemplate(){
    $('main').html(`
      <div class="container">
          <div class="row col-lg-12 mt-2">
            <div class="col-lg-8">
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src="/imgs/${this.img[0]}" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="/imgs/${this.img[1]}" alt="Third slide">
                  </div>
                  <div class="carousel-item">
                    <!--Måste bestämma storleken på bilderna-->
                    <iframe width="690" height="431" src="https://www.youtube.com/embed/${this.trailer}" frameborder="0" encrypted-media" allowfullscreen></iframe>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div class="border col-lg-12">
                <h2 class="text-center">${this.title}</h2>
                <div class="om-film mt-2">
                  <p>${this.description}</p>
                </div>

                <div id="accordion" role="tablist">
                  <div class="card">
                    <div class="card-header" role="tab" id="headingOne">
                      <h5 class="mb-0">
                            <a class="text-dark" data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseOne">
                              Produktions Information
                            </a>
                          </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        <ul class="film-produkt-info">
                          ${this.facts}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" role="tab" id="headingTwo">
                      <h5 class="mb-0">
                            <a class="collapsed text-dark" data-toggle="collapse" href="#collapseTwo" role="button" aria-expanded="false" aria-controls="collapseTwo">
                              Recensioner
                            </a>
                          </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                      <div class="card">
                        <div class="card-body">
                          <blockquote class="blockquote mb-0">
                            <h4><i class="fa fa-star" aria-hidden="true"></i> ${this.reviews[0].stars}<small>/${this.reviews[0].max}</small></h4>
                            <p>${this.reviews[0].quote}</p>
                            <div class="blockquote-footer">${this.reviews[0].source}</div>
                          </blockquote>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <blockquote class="blockquote mb-0">
                            <h4><i class="fa fa-star" aria-hidden="true"></i> ${this.reviews[1].stars}<small>/${this.reviews[1].max}</small></h4>
                            <p>${this.reviews[1].quote}</p>
                            <div class="blockquote-footer">${this.reviews[1].source}</div>
                          </blockquote>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <blockquote class="blockquote mb-0">
                            <h4><i class="fa fa-star" aria-hidden="true"></i> ${this.reviews[2].stars}<small>/${this.reviews[2].max}</small></h4>
                            <p>${this.reviews[2].quote}</p>
                            <div class="blockquote-footer">${this.reviews[2].source}</div>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="imdb-info text-center">
                  <a target="blank" href="http://www.imdb.com/title/tt3659388/?ref_=nv_sr_1">Filmen på Imdb</a>
                </div>
              </div>
            </div>
            ${this.templatesClass.calendar()}
          </div>
        </div>
    `);
  }
}