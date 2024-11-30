import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { HomeComponent } from './Components/home/home.component';
import { StudentsComponent } from './Components/students/students.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { SalariesComponent } from './Components/salaries/salaries.component';
import { ExpensesComponent } from './Components/expenses/expenses.component';
import { InfoComponent } from './Components/students/info/info.component';

const routes: Routes = [
  {path: '', component:CoreComponent,
    children: [
    {path: '' , redirectTo: '/core/home', pathMatch:'full'},
    {path: 'home',        component:HomeComponent},
    {path: 'students',    component:StudentsComponent},
    {path: 'student/:id', component:InfoComponent},
    {path: 'employee',    component:EmployeeComponent},
    {path: 'teachers',    component:TeachersComponent},
    {path: 'salaries',    component:SalariesComponent},
    {path: 'expenses',    component:ExpensesComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
