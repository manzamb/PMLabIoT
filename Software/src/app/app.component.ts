import { Component, ViewChild} from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Inicio } from '../pages/inicio/inicio';
import { Apagar } from "../pages/apagar/apagar";
import { Graficas } from "../pages/graficas/graficas";
import { Sensores } from "../pages/sensores/sensores";
import { Temporizador } from "../pages/temporizador/temporizador";
import { Acerca } from "../pages/acerca/acerca";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //importar Nav en ionic.angular
  //iportar ViewChild en @angular/core
  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  //se crea un array con los atributos de las paginas que se van a usar
  public pages: Array<{ titulo: string, componente:any, icono: string}>;  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.rootPage = Inicio;

    this.pages = [
      {titulo : 'inicio' ,        componente: Inicio,       icono:'home'},
      {titulo : 'Apagar' ,        componente: Apagar,       icono:'power'},
      {titulo : 'Sensores' ,      componente: Sensores,     icono:'wifi'},
      {titulo : 'Graficas' ,      componente: Graficas,     icono:'stats'},
      {titulo : 'Temporizador' ,  componente: Temporizador, icono:'time'},
      {titulo : 'Acerca de' ,     componente: Acerca,       icono:'information-circle'},      
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });    
  }

  irPagina(page){    
    this.nav.setRoot(page);    
  }  

}

