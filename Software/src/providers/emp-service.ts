import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

//import calses de modelo para enviar informacion
import { Temperatura } from "../models/temperatura";
import { Humedad } from "../models/humedad";
import { FlujoAgua } from "../models/flujoAgua";
//import { Encendido } from "../models/encendido";

//import libreria para convertir xml a json
//import { xml2js } from "xml2js";

//procesar la respuesta
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpService {

  public xmlItems:    any;
  public urlService:  string;
  public osid:        string;
  public ip :         string;
  
  constructor(public http: Http) {
    console.log('Hello EmpService Provider');        
    this.osid = "?osid=1519735968"
    this.ip = "192.168.0.104"
  }  

  getTemperatura(): Observable<Temperatura>{
    //en el map va una funcion que permita procesar respuesta
    //el cath es para procesar el error    
    return this.http.get("http://" + this.ip + "/SendData" + this.osid + "&variableEstado=Temperatura&tipove=1")
    .map(this.procesarRespuestaTemp).catch(this.procesarError);  
  }
  private procesarRespuestaTemp(response : Response){
    let texto = response.text();
    //var num =  this.buscarValor(body);
    var posIni = texto.indexOf("float") + 5 + 1 + 1;
    var num;
    //recorrer el string del xml
    for (var i = posIni; i < texto.length; i++){
      var bo = texto[i] ;
      var con = bo.localeCompare("<");
      //si encuentra un '<'
      if (con == 0){
        num = texto.substring(posIni,i);
        break;
      }
    }
    let temperatura = new Temperatura(num);
    return temperatura;
  }

  getHumedad(): Observable<Humedad>{    
    return this.http.get("http://" + this.ip + "/SendData" + this.osid + "&variableEstado=Humedad&tipove=1")
    .map(this.procesarRespuestaHum).catch(this.procesarError);  
  }
  private procesarRespuestaHum(response : Response){
    let texto = response.text();    
    //var num =  this.buscarValor(body);    
    var posIni = texto.indexOf("float") + 5 + 1 + 1;
    var num;
    //recorrer el string del xml
    for (var i = posIni; i < texto.length; i++){
      var bo = texto[i] ;
      var con = bo.localeCompare("<");
      //si encuentra un '<'
      if (con == 0){
        num = texto.substring(posIni,i);
        break;
      }
    }
    let humedad = new Humedad(num);
    return humedad;
  }

  getFlujoAgua(): Observable<FlujoAgua>{    
    return this.http.get("http://" + this.ip + "/SendData" + this.osid + "&variableEstado=Presencia&tipove=1")
    .map(this.procesarRespuestaFlujoAgua).catch(this.procesarError);  
  }  
  private procesarRespuestaFlujoAgua(response : Response){
    let texto = response.text();
    //var num =  this.buscarValor(body);
    var posIni = texto.indexOf("float") + 5 + 1 + 1;
    var num;
    //recorrer el string del xml
    for (var i = posIni; i < texto.length; i++){
      var bo = texto[i] ;
      var con = bo.localeCompare("<");
      //si encuentra un '<'
      if (con == 0){
        num = texto.substring(posIni,i);
        break;
      }
    }
    let flujoAgua = new FlujoAgua(num);
    return flujoAgua;
  }

  buscarValor(texto: string): string{    
    //5 por tamaño de palabra float, 1 por l colilla y 1 por el mayor que
    var posIni = texto.indexOf("float") + 5 + 1 + 1;
    var num;
    //recorrer el string del xml
    for (var i = posIni; i < texto.length; i++){
      var bo = texto[i] ;
      var con = bo.localeCompare("<");
      //si encuentra un '<'
      if (con == 0){
        num = texto.substring(posIni,i);
        break;
      }
    }
    return num;
  }

  private procesarError (){
    return Observable.throw("Error al consumir servicio de la EMP");
  }




}

