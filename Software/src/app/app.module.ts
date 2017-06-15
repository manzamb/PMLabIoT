import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//providers internet
import { HttpModule } from "@angular/http";

//paginas de menu
import { MyApp } from './app.component';
import { Inicio } from '../pages/inicio/inicio';
import { Apagar } from "../pages/apagar/apagar";
import { Graficas } from "../pages/graficas/graficas";
import { Sensores } from "../pages/sensores/sensores";
import { Temporizador } from "../pages/temporizador/temporizador";
import { Acerca } from "../pages/acerca/acerca";

//paginas para cada sensor
import { SnsTemperatura } from "../pages/sns-temperatura/sns-temperatura";
import { SnsHumedad } from "../pages/sns-humedad/sns-humedad";
import { SnsFlujoagua } from "../pages/sns-flujoagua/sns-flujoagua";

//componentes
import { Grafica } from "../components/grafica/grafica";
import { RangoSensor } from "../components/rango-sensor/rango-sensor";

//graficas
import { ChartModule } from "angular2-highcharts";
import * as highcharts from 'Highcharts';

//obtener valor sensores
import { EmpService } from "../providers/emp-service";
import { EmpEcaProvider } from '../providers/emp-eca/emp-eca';
import { ApagarProvider } from '../providers/apagar/apagar';
import { EmpEcaHumedadProvider } from '../providers/emp-eca-humedad/emp-eca-humedad';


@NgModule({
  declarations: [
    MyApp,
    Inicio,
    Apagar,
    Graficas,
    Sensores,
    Temporizador,
    Acerca,    
    SnsTemperatura,
    SnsHumedad,
    SnsFlujoagua,
    Grafica,
    RangoSensor
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule.forRoot(highcharts),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Inicio,
    Apagar,
    Graficas,
    Sensores,
    Temporizador,
    Acerca,
    SnsTemperatura,
    SnsHumedad,
    SnsFlujoagua,
    Grafica,
    RangoSensor
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmpService,
    EmpEcaProvider,
    ApagarProvider,
    EmpEcaHumedadProvider
  ]
})
export class AppModule {}
