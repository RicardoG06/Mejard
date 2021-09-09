import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url
  }

  login_cliente(data:any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+ 'login_cliente',data,{headers:headers});
  }

  registro_cliente(data:any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+ 'registro_cliente',data,{headers:headers});
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
}
