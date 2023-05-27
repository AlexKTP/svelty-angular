import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



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
    }, {});
  }

  registerFormSubmit() {
  }


  toggleButtonClicked() {
    this.isLogin = !this.isLogin;
  }


}
