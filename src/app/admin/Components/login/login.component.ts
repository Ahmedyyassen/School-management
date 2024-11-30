import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl,FormGroupDirective, NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Shared/Services/Auth/auth.service';
import { Router } from '@angular/router';

// ***************** form *************************
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule,MatFormFieldModule, MatInputModule,MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class LoginComponent {
  form!: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm();
  }


  private createForm(): void {
    this.form = this.formBuilder.group({
      email: this.emailFormControl,
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      returnSecureToken: true
    })
    // this. getResponse();
  }
  login(): void {
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
    } else {
      this.toastr.warning('من فضلك ادخل بيانات صحيحة', 'خطأ في التسجيل');
    }
  }

  signUp(): void {
    this.router.navigate(['/singup'])
  }


}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
