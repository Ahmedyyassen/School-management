import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://topico-stpre-default-rtdb.firebaseio.com/';

  private http = inject(HttpClient);

  public getApi<T>(path : string) : Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`)
  }
  public postApi(url : string, body : any, headers : any) : Observable<ArrayBuffer>{
    return this.http.post(url, body, headers);
  }
}
