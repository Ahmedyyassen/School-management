import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Shared/Services/Auth/auth.service';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService]
})
export class SignupComponent {

  form!: FormGroup ;
 constructor(private formBuider : FormBuilder,
             private router : Router,
             private toastr: ToastrService,
             private auth : AuthService
            ){
  scrollTo({
    top:0,
    behavior: 'smooth'
  })
  this.formsubmit()
 }


  public formsubmit(): void{
    this.form = this.formBuider.group({
      name : ['',Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    },
  )
  }

  signUp(){
    const formValue = this.form.value
    const temp = {email : formValue.email, password : formValue.password, returnSecureToken: true}
    console.log(temp);

    if (this.form.valid) {
      this.auth.signUp(temp).subscribe(data => {
        console.log(data);
        this.toastr.success('Email created successfully',`Thanks ${formValue.name}`)
      }, err =>{
        console.log(err.err);
        this.toastr.error('برجاء التأكد من البيانات المدخلة', 'خطأ في التسجيل');
      })
    }else{
      this.toastr.warning('من فضلك ادخل بيانات صحيحة', 'خطأ في التسجيل');
    }
  }
  login(){
    this.router.navigate(['/login'])
  }

}
