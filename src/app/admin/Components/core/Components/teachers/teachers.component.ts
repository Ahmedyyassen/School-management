import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { student } from '../../../../../Shared/Interface/interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


// ************ input ****************
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../Services/Students/student.service';
import { ToastrService } from 'ngx-toastr';
import { NodataComponent } from "../nodata/nodata.component";


// ****************************
const modulses = [ReactiveFormsModule,FormsModule,MatTableModule, MatPaginatorModule,FormsModule,MatFormFieldModule, MatInputModule,CommonModule,MatMenuModule,MatButtonModule,NodataComponent]
@Component({
  selector: 'app-teachers',
  imports: modulses,
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit,OnDestroy,AfterViewInit {
  sreach : string = "";
  subscribeList: Subscription[] = [];
  dataSource = new MatTableDataSource<student>([]);
  displayedColumns: string[] = ['position', 'name', 'StudentID', 'Gender','Class','expenses','options'];

  temp : Array<student> = [];
  form! :FormGroup;
constructor(private fb: FormBuilder, private request:StudentService, private toaster : ToastrService){

  this.initForm();
}
ngOnInit(): void {
  this.getStudents();
}

// **************** get all students ****************
  private getStudents(): void{
    this.subscribeList.push(
      this.request.getRequest().subscribe((data:student[])=>{
       this.dataSource.data = data;
       this.temp = data;
      })
    )
  }

  // **************** search ************************
  protected search(): void{
    this.dataSource.filter = this.sreach.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // *************** Create student form ********************
  private initForm(): void {
    this.form = this.fb.group({
      StudentID:      ['',[Validators.required, Validators.minLength(10)]],
      ParentID:       ['',[Validators.required, Validators.minLength(10)]],
      address:        ['',[Validators.required,]],
      Phone:          ['',[Validators.required, Validators.minLength(10)]],
      Nationality:    ['الجنسية',[Validators.required,]],
      FirstName:      ['',[Validators.required,]],
      LastName:       ['',[Validators.required,]],
      DateOfBirth:    ['',[Validators.required,]],
      more:           ['',[Validators.required,]],
      Gender:         ['الجنس',[Validators.required,]],
      Class:          ['السنة الدراسية',[Validators.required,]],
      expensesStutus: ['الرسوم',[Validators.required,]],
    });
  }

  // *************** add student ********************
  addStudent():void{
    const formValue = this.form.value;
    if (this.form.valid) {
      this.request.postRequest(formValue).subscribe(() => {
        this.getStudents();
        this.form.reset();
        this.toaster.success('تمت اضافة الطالب بنجاح  ', 'عملية ناجحة');
      }, () =>{
        this.toaster.error('الخادم لا يستجيب', 'حدث خطأ')
      })

    }else{
      this.toaster.warning('من فضلك اكمل ادخال البيانات', 'حدث خطأ')

    }
  }
  // *************** delete student ********************
  public deleteStudent(StudentID : number):void{
    const temp = this.dataSource.filteredData.find(p => p.StudentID === StudentID);
    const id = this.dataSource.filteredData.indexOf(temp!)
    console.log(id);
    this.request.deleteRequest(id).subscribe(()=>{
      console.log("deleteStudent successfully");

    },err=>{
      console.log(err.error);
    })
  }

// ****************** Hoooks *****************************
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscribeList.forEach((data) => {
      data.unsubscribe();
    });
  }
}
