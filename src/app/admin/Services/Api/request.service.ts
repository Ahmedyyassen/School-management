import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Shared/Services/Api/api.service';
import { Login } from '../../../Shared/Interface/interface';
import { apiUrl } from '../../../Shared/environment/links';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = inject(ApiService);


  // public getRequest(): Observable<any> {
  //   return this.api.getApi<any>("FinalStudents.json")
  //   .pipe(map(
  //     data => data = Object.values(data)
  //   ));
  // }

  // public postRequest(body : any): Observable<any> {
  //   return this.api.postApi(`${apiUrl}FinalStudents.json`, body , {'Content-Type': 'application/json'});
  // }

  // public deleteRequest(id : number): Observable<void> {
  //   return this.api.deleteApi<void>("Students.json",id);
  // }

}
