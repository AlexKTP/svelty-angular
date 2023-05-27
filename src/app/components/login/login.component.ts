import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;


  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  isLogin = false;
  name: string = "";
  email: string = "";
  password: string = "";
  confirm: string = "";

  isCompliant = false;

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  // Add the validator to the form builder
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  registerFormSubmit() {
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirm = this.registerForm.get('confirm')?.value;

      if (password !== confirm) {
        this.registerForm.get('confirm')?.setErrors({ passwordMismatch: true });
      } else {
        // Form submission logic
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirm')?.value;

    if (password !== confirm) {
      return { passwordMismatch: true };
    }

    return null;
  }



  validateConfirmPassword() {
    const confirmPasswordControl = this.registerForm.get('confirm');
    if (confirmPasswordControl && this.confirmPasswordInput) {
      if (confirmPasswordControl.invalid && confirmPasswordControl.touched) {
        this.confirmPasswordInput.nativeElement.classList.add('is-invalid');
      } else {
        this.confirmPasswordInput.nativeElement.classList.remove('is-invalid');
      }
    }
  }



  toggleButtonClicked() {
    this.isLogin = !this.isLogin;
  }


}
