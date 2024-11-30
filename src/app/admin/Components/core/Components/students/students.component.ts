import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { student } from '../../../../../Shared/Interface/interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


// ************ input ****************
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../Services/Students/student.service';
import { ToastrService } from 'ngx-toastr';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NodataComponent } from '../nodata/nodata.component';
import { Router } from '@angular/router';

// ****************************
const modulses = [ReactiveFormsModule,FormsModule,MatTableModule,
                  MatPaginatorModule,FormsModule,MatFormFieldModule,
                   MatInputModule,CommonModule,MatButtonModule,MatMenuModule,
                   ]
@Component({
  selector: 'app-students',
  imports: modulses,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit,OnDestroy,AfterViewInit {
  // ******************* attributes ***************************
  sreach : string = "";
  subscribeList: Subscription[] = [];
  dataSource = new MatTableDataSource<student>([]);
  displayedColumns: string[] = ['position', 'name', 'StudentID', 'Gender','Class','expenses','options'];
  form! :FormGroup;
  scrambledId : string = "";
  btnFlag : boolean = true;

// ******************* constractor ***************************
constructor(private fb: FormBuilder,
            private request:StudentService,
            private router : Router,
            private toaster : ToastrService) {
}
// ****************** Hoooks *****************************
ngOnInit(): void {
  this.getStudents();
  this.initForm();
}
@ViewChild(MatPaginator) paginator! : MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

ngOnDestroy(): void {
  this.subscribeList.forEach((data) => {
    data.unsubscribe();
  });
}

  // *************** initiate student form ***********
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

  // **************** search ************************
    protected search(): void{
      this.dataSource.filter = this.sreach.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

// **************** get all students ****************
  private getStudents(): void{
    this.subscribeList.push(
      this.request.getRequest().subscribe((data:student[])=>{
       this.dataSource.data = data;
      })
    )
  }

  // *************** add student ********************
  addStudent():void{
    const formValue = this.form.value;
    if (this.form.valid) {
      this.subscribeList.push(
      this.request.postRequest(formValue).subscribe(() => {
        this.getStudents();
        this.form.reset();
        this.toaster.success('تمت اضافة الطالب بنجاح  ', 'عملية ناجحة');
      }, () =>{
        this.toaster.error('الخادم لا يستجيب', 'حدث خطأ')
      }))

    }else{
      this.toaster.warning('من فضلك اكمل ادخال البيانات', 'حدث خطأ')
    }
  }

  // *************** edit student ********************
  // ***************** first *************************
  editForm(student : student): void{
    this.scrambledId = student.scrambledId;
    this.btnFlag = false;
    this.form.patchValue(student);
  }
  // ***************** second*************************
  editStudent():void{
    const student  : student = {
      ...this.form.value , scrambledId : this.scrambledId
    }
    if (this.form.valid) {
      this.subscribeList.push(
      this.request.patchRequest(student).subscribe(() =>{
        this.getStudents();
        this.form.reset();
        this.toaster.success('تم تحديث البيانات بنجاح','عملية ناجحة')
        this.btnFlag = true;
      },()=>{
        this.toaster.error('الخادم لا يستجيب', 'حدث خطأ')
      }))
    }else{
      this.toaster.warning('من فضلك اكمل ادخال البيانات', 'حدث خطأ')
    }
  }
  // *************** delete student ******************
  public deleteStudent(id : string):void{
    this.subscribeList.push(
    this.request.deleteRequest(id).subscribe(()=>{
      this.toaster.success('تم الحذف الطالب بنجاح','عملية ناجحة')
      this.getStudents();
    },err=>{
      this.toaster.error('الخادم لا يستجيب', 'حدث خطأ')
    }))
  }


  showMoreDetailes(student : student): void{
    this.router.navigate([`core/student/${student.scrambledId}`]);
  }

}
