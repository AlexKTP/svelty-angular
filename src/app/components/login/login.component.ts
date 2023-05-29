import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceComponent } from 'src/app/services/auth-service/auth-service.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;

  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  confirmationPasswordValidationReason: string = '';

  isLogin = false;
  name: string = "";
  email: string = "";
  password: string = "";
  confirm: string = "";
  token: string = "";


  isCompliant = false;

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceComponent, private router: Router) { }

  // Add the validator to the form builder
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {});

    this.confirmationPasswordValidationReason = this.getConfirmationPasswordValidationReason();
  }

  registerFormSubmit() {

    if (this.isLogin) {
      this.authService.login(this.registerForm.get('name')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
        value => {
          this.token = value?.token
          if (this.token.length > 0) {
            localStorage.setItem('token', this.token)
            this.router.navigate(['/home'])
          }

        }
      )
    } else {
      this.authService.register(this.registerForm.get('name')?.value, this.registerForm.get('password')?.value, this.registerForm.get('email')?.value).subscribe(
        value => {
          console.log('authservice' + value)
        }
      )
    }
  }


  toggleButtonClicked() {
    this.isLogin = !this.isLogin;
  }



  getConfirmationPasswordValidationReason(): string {
    const confirmPasswordControl = this.registerForm.get('confirm');
    const passwordControl = this.registerForm.get('password');

    if (confirmPasswordControl?.errors?.['required']) {
      return 'Password confirmation is required.';
    }

    if (confirmPasswordControl?.value !== passwordControl?.value) {
      return 'Passwords do not match.';
    }

    if (confirmPasswordControl?.value.length < 8) {
      return 'Passwords must contain at least 8 characters (with 1 special character && 1 uppercase letter and 1 number).';
    }


    // Add more validation checks and corresponding reasons as needed

    return '';
  }




}
