import { Routes } from '@angular/router';
import { LoginComponent } from './admin/Components/login/login.component';
import { loginGuard } from './Shared/Guard/login.guard';
import { SignupComponent } from './admin/Components/signup/signup.component';

export const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'singup', component: SignupComponent, title: 'sing up'},
  {path:'core', canMatch : [loginGuard],
    loadChildren:()=> import ('./admin/Components/core/core.module').then( (m) => m.CoreModule)
  }
];
