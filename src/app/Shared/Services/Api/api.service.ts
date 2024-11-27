import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://mr-codeboy-default-rtdb.firebaseio.com/Customers.json';

  private http = inject(HttpClient);

  public getApi<T>() : Observable<T> {
    return this.http.get<T>(this.apiUrl)
  }
  public postApi(url : string, body : any, headers : any) : Observable<ArrayBuffer>{
    return this.http.post(url, body, headers);
  }
}
