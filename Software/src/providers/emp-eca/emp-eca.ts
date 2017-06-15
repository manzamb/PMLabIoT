import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Temperatura } from "../../models/temperatura";
import { Eca } from "../../models/eca";

import { RangoSensorModel } from "../../models/rangoSensor";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmpEcaProvider {

  private osid:        string;
  private ip :         string;

  private EcaMax1 = "http://192.168.0.104/MakeContract?osid=1519735968&osidDestino=1519735968&contrato=%3C%3Fxml+version%3D%221.0%22+encoding%3D%22UTF-8%22%3F%3E%3CObjects%3E++%3CObject%3E++++1519735968++++%3CInfoItem+name%3D%22eca%22%3E++++++%3CInfoItem+name%3D%22name_eca%22%3E++++++++%3Cvalue+type%3D%22string%22%3EEcaTemperaturaMaxima%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22state_eca%22%3E++++++++%3Cvalue+name%3D%22string%22%3Eon%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22interest_entity_eca%22%3E++++++++%3Cvalue+name%3D%22string%22%3ESala%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22event%22%3E++++++++%3CInfoItem+name%3D%22id_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E1519735968%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22ip_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E192.168.0.23%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Exxxxxxx%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22id_event_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ETemperatura%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_event_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ETemperatura%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22condition%22%3E++++++++%3CInfoItem+name%3D%22comparator_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Emayor%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22variable_condition%22%3E++++++++++%3Cvalue+type%3D%22float%22%3E";

  private EcaMax2 = "%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22unit_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3EC%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22meaning_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Eabjsjd%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22action%22%3E++++++++%3CInfoItem+name%3D%22id_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E1519735968%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22ip_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E192.168.0.23%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Exxxxxxxx%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22id_action_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ERelay%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_action_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ERelay%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22comparator_action%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Eigual%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22variable_action%22%3E++++++++++%3Cvalue+type%3D%22bool%22%3E1%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22unit_action%22%3E++++++++++%3Cvalue+type%3D%22string%22+%2F%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22meaning_action%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Ejsjdhdj%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++%3C%2FInfoItem%3E++%3C%2FObject%3E%3C%2FObjects%3E";

  private EcaMin1 = "http://192.168.0.104/MakeContract?osid=1519735968&osidDestino=1519735968&contrato=%3C%3Fxml+version%3D%221.0%22+encoding%3D%22UTF-8%22%3F%3E%3CObjects%3E++%3CObject%3E++++1519735968++++%3CInfoItem+name%3D%22eca%22%3E++++++%3CInfoItem+name%3D%22name_eca%22%3E++++++++%3Cvalue+type%3D%22string%22%3EEcaTemperaturaMinima%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22state_eca%22%3E++++++++%3Cvalue+name%3D%22string%22%3Eon%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22interest_entity_eca%22%3E++++++++%3Cvalue+name%3D%22string%22%3ESala%3C%2Fvalue%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22event%22%3E++++++++%3CInfoItem+name%3D%22id_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E1519735968%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22ip_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E192.168.0.23%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_event_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Exxxxxxx%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22id_event_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ETemperatura%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_event_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ETemperatura%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22condition%22%3E++++++++%3CInfoItem+name%3D%22comparator_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Emenor%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22variable_condition%22%3E++++++++++%3Cvalue+type%3D%22float%22%3E";

  private EcaMin2 = "%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22unit_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3EC%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22meaning_condition%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Eabjsjd%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++++%3CInfoItem+name%3D%22action%22%3E++++++++%3CInfoItem+name%3D%22id_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E1519735968%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22ip_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3E192.168.0.23%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_action_object%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Exxxxxxxx%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22id_action_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ERelay%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22name_action_resource%22%3E++++++++++%3Cvalue+type%3D%22string%22%3ERelay%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22comparator_action%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Eigual%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22variable_action%22%3E++++++++++%3Cvalue+type%3D%22bool%22%3E0%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22unit_action%22%3E++++++++++%3Cvalue+type%3D%22string%22+%2F%3E++++++++%3C%2FInfoItem%3E++++++++%3CInfoItem+name%3D%22meaning_action%22%3E++++++++++%3Cvalue+type%3D%22string%22%3Ejsjdhdj%3C%2Fvalue%3E++++++++%3C%2FInfoItem%3E++++++%3C%2FInfoItem%3E++++%3C%2FInfoItem%3E++%3C%2FObject%3E%3C%2FObjects%3E";

  constructor(public http: Http) {
    console.log('Hello EmpEcaProvider Provider');
    this.osid = "?osid=1519735968"
    this.ip = "186.87.66.4"
  }


  //metodos temperatura maxima
  deleteTemperaturaMax(): Observable<Eca>{
    //let v =  this.http.get(this.ip + "/DeleteEca" + this.osid + "&ecaName=EcaTemperaturaMaxima")
    let v =  this.http.get("http://192.168.0.104/DeleteEca?osid=1519735968&ecaName=EcaTemperaturaMaxima")
      .map(this.procesarRespuestaTempMax).catch(this.procesarError);

    return v;
  }
  private procesarRespuestaTempMax(response : Response){
    let res = response.status;
    let status = new Eca(res);
    return status;
  }

  putTemperaturaMax(valor : number) : Observable<Eca>{
    //return this.http.get(this.ip + "/DeleteEca" + this.osid + "&ecaName=EcaTemperaturaMinima")
    return this.http.get(this.EcaMax1 + valor + this.EcaMax2 )
      .map(this.procesarRespuestaEcaTempMax).catch(this.procesarError);
  }
  private procesarRespuestaEcaTempMax(response : Response){
    let res = response.status;
    let status = new Eca(res);
    return status;
  }  


  //metodos temperatura minima
  deleteTemperaturaMin() : Observable<Eca>{
    //return this.http.get(this.ip + "/DeleteEca" + this.osid + "&ecaName=EcaTemperaturaMinima")
    return this.http.get("http://192.168.0.104/DeleteEca?osid=1519735968&ecaName=EcaTemperaturaMinima")
      .map(this.procesarRespuestaTempMin).catch(this.procesarError);
  }

  private procesarRespuestaTempMin(response : Response){
    let res = response.status;
    let status = new Eca(res);
    return status;
  }

  putTemperaturaMin(valor : number) : Observable<Eca>{
    //return this.http.get(this.ip + "/DeleteEca" + this.osid + "&ecaName=EcaTemperaturaMinima")
    return this.http.get(this.EcaMin1 + valor + this.EcaMin2)
      .map(this.procesarRespuestaEcaTempMin).catch(this.procesarError);
  }

  private procesarRespuestaEcaTempMin(response : Response){
    let res = response.status;
    let status = new Eca(res);
    return status;
  }

  private procesarError (){
    return Observable.throw("Error al consumir servicio de la EMP");
  }

}