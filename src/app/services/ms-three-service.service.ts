import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Root } from '../models/root';

@Injectable({
  providedIn: 'root'
})
export class MsThreeServiceService {

  private urlBaseApi:string=environment.url_interoperabilidad;
  private urlEndPointRoot:string = this.urlBaseApi + "/api/roots";

  constructor(private http:HttpClient) { }

  getRoots(page:number): Observable<any>{

    return this.http.get(`${this.urlEndPointRoot}/page/${page}`).pipe(
      map( (response:any) => {
        (response.content as Root[])
          return response;
        })
      );
  }

  getRootsByParameters(page:number, textSearch: string): Observable<any>{
    const httHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.urlEndPointRoot}/find-by-parameters/page/${page}`, textSearch, {headers: httHeaders}).pipe(
      map( (response:any) => {
        (response.content as Root[])
          return response;
        })
      );
  }

}
