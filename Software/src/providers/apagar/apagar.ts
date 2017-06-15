import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Encendido } from "../../models/encendido";

@Injectable()
export class ApagarProvider {

  constructor(public http: Http) {
    console.log('Hello ApagarProvider Provider');
  }

  public apagarEstacion(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetDatastream?osid=1519735968&idDataStream=Relay&comando=off")
      .map(this.resolverPeticionOff)
      .catch(this.procesarError)
  }

  public resolverPeticionOff(response: Response){
    let status = response.status;

    if(status == 200 ){
      let encendido = new Encendido("Apagado");
      return encendido;
    }
    return null;
  }

  public encenderEstacion(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetDatastream?osid=1519735968&idDataStream=Relay&comando=on")
      .map(this.resolverPeticionOn)
      .catch(this.procesarError)
  }

  public resolverPeticionOn(response: Response){
    let status = response.status;

    if(status == 200 ){
      let encendido = new Encendido("Encendido");
      return encendido;
    }
    return null;
  }

  private procesarError (){
    return Observable.throw("Error al consumir servicio de la EMP");
  }






  public encenderEcaTempMax(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetEcaState?osid=1519735968&nombreECA=EcaTemperaturaMaxima&comando=on")
      .map(this.resolverTempMax)
      .catch(this.procesarError)
  }
  public resolverTempMax(response: Response){
    let status = response.status;
    if(status == 200 ){
      console.log("eca temp max encendido");
      return;      
    }
    return null;
  }

  public encenderEcaTempMin(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetEcaState?osid=1519735968&nombreECA=EcaTemperaturaMinima&comando=on")
      .map(this.resolverTempMin)
      .catch(this.procesarError)
  }
  public resolverTempMin(response: Response){
    let status = response.status;
    if(status == 200 ){      
      console.log("eca temp min encendido");
      return;      
    }
    return null;
  }







  public encenderEcaHumMax(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetEcaState?osid=1519735968&nombreECA=EcaHumedadMaxima&comando=on")
      .map(this.resolverHumMax)
      .catch(this.procesarError)
  }
  public resolverHumMax(response: Response){
    let status = response.status;
    if(status == 200 ){      
      console.log("eca hum max encendido");
      return;      
    }
    return null;
  }

  public encenderEcaHumMin(): Observable<Encendido> {
    return this.http.get("http://192.168.0.104/SetEcaState?osid=1519735968&nombreECA=EcaHumedadMinima&comando=on")
      .map(this.resolverHumMin)
      .catch(this.procesarError)
  }
  public resolverHumMin(response: Response){
    let status = response.status;
    if(status == 200 ){      
      console.log("eca hum min encendido");
      return;      
    }
    return null;
  }


}
