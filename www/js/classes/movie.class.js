class Movie{
  constructor(img, trailer, imdb, title, description, facts, reviews, templatesClass){
    this.img = img;
    this.trailer = trailer;
    this.imdb = imdb;
    this.title = title;
    this.description = description;
    this.facts = '<li>' + facts.join('</li><li>') + '</li>';
    this.reviews = reviews;
    this.templatesClass = templatesClass;
    $('main').html(this.drawMovieTemplate());
  }

}
