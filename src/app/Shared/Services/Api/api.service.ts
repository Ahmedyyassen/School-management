import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey, apiUrl } from '../../environment/links';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  public getApi<T>(path : string) : Observable<T> {
    return this.http.get<T>(`${apiUrl}${path}`)
  }

  public postApi(url : string, body : any, headers : any) : Observable<ArrayBuffer>{
    return this.http.post(url, body, headers);
  }

  public patchingApi(url : string, body : any, headers : any) : Observable<ArrayBuffer>{
    return this.http.patch(url, body, headers);
  }

  public deleteApi<T>(url :string): Observable <T> {
    return this.http.delete<T>(url)
  }
}
