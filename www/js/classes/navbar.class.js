class Navbar extends Base {

  constructor(){
    super();
    this.items = [
      new NavbarItem('Startsidan', '/'),
      new NavbarItem('Filmer', '/filmer'),
      new NavbarItem('Biljetter', '/biljetter'),
      new NavbarItem('Om oss', '/om_oss')
    ];
    this.login = new LogIn();
  }

  setActive(url){
    for(let item of this.items){
      item.active = url == item.url;
    }
    this.render();
  }


}