import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Shared/Services/Api/api.service';
import { Login } from '../../../Shared/Interface/interface';
import { map, Observable } from 'rxjs';
import { apiUrl } from '../../../Shared/environment/links';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = inject(ApiService);


  public getRequest(): Observable<any> {
    return this.api.getApi<any>()
    // .pipe(map(
    //   data => data = Object.values(data)
    // ));
  }
  public postRequest(body : Login): Observable<any> {
    return this.api.postApi(apiUrl, body , {'Content-Type': 'application/json'});
  }

}
