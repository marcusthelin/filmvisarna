class Navbar extends Base {

  constructor(app){
    super();
    this.app = app;
    this.items = [
      new NavbarItem('Startsidan', '/'),
      new NavbarItem('Filmer', '/filmer'),
      new NavbarItem('Biljetter', '/biljetter'),
      new NavbarItem('Om oss', '/om_oss')
    ];
    this.login = new LogIn(this.app); // TODO: Remove app reference
  }

  async setActive(url){
    for(let item of this.items){
      item.active = url == item.url;
    }

    //Render correct nav depending on if the user is logged in or not
    if(await this.app.userPage.isLoggedIn()){
      this.render('', '2');
    } else{
      this.render();
    }
  }


}
