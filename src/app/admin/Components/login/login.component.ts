import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Shared/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
     ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AuthService]
})

export class LoginComponent {

  form!: FormGroup;
  constructor(private formBuilder : FormBuilder,
             private auth : AuthService,
              private toastr: ToastrService,
              private router: Router
            )
  {
    this.createForm();
  }


  private createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      returnSecureToken	: true
    })
    // this. getResponse();
  }
   login() : void {
    const formValue = this.form.value;
    if (this.form.valid) {
      this.auth.signIn(formValue).subscribe(data => {
        console.log("login successfully");
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/core']);
        this.toastr.success('مرحبا يا احمد', 'تم تسجيل الدخول بنجاح');
        }, err => {
        this.toastr.error('برجاء التأكد من البيانات المدخلة', 'خطأ في التسجيل');
      })
    }else{
      this.toastr.warning('من فضلك ادخل بيانات صحيحة', 'خطأ في التسجيل');
    }
  }

  signUp():void{
    this.router.navigate(['/singup'])
  }


}
