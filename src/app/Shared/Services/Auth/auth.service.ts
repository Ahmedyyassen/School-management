import { Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { Observable } from 'rxjs';
import { signUp, signIn } from '../../environment/links';
import { Login } from '../../Interface/interface';

@Injectable()
export class AuthService {

  constructor(private api : ApiService) { }

  signUp(body : Login): Observable <any>{
    return this.api.postApi(signUp , body , {'Content-Type': 'application/json'} )
  }
  signIn(body : Login): Observable <any>{
    return this.api.postApi(signIn , body , {'Content-Type': 'application/json'} )
  }
}
