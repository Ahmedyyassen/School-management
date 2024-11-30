import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../../../Shared/Services/Api/api.service';
import { apiUrl } from '../../../../../Shared/environment/links';
import { student } from '../../../../../Shared/Interface/interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private api = inject(ApiService);


  public getRequest(): Observable <Array<student>> {
    return this.api.getApi<Array<student>>("FinalStudents.json")
    .pipe(map(
      (data) => {
        return Object.entries(data).map( ([key, value]) => {
            return{
              id: value.id,
              scrambledId: key,
              StudentID: value.StudentID,
              ParentID: value.ParentID,
              address: value.address,
              Phone: value.Phone,
              Nationality: value.Nationality,
              FirstName: value.FirstName,
              LastName: value.LastName,
              DateOfBirth: value.DateOfBirth,
              more: value.more,
              Gender: value.Gender,
              Class: value.Class,
              expensesStutus: value.expensesStutus,
              }
          })
      }
    ));
  }

  public getById(id: string): Observable<student>{
    return this.api.getApi<student>(`FinalStudents/${id}.json`);
  }

  public postRequest(body : student): Observable<any> {
    return this.api.postApi(`${apiUrl}FinalStudents.json`, body , {'Content-Type': 'application/json'});
  }

  public patchRequest(body : student): Observable<any> {
    return this.api.patchingApi(`${apiUrl}FinalStudents/${body.scrambledId}.json`, body , {'Content-Type': 'application/json'});
  }

    public deleteRequest(id : string): Observable<void> {
    return this.api.deleteApi<void>(`${apiUrl}FinalStudents/${id}.json`);
  }

}
