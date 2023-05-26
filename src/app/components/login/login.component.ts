import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  isLogin = false;
  name: string = "";
  email: string = "";
  password: string = "";
  confirm: string = "";

  isCompliant = false;

  registerFormSubmit() {

    if (!this.isLogin && this.name.length && this.email.length && this.password.length && this.confirm.length) {
      if ((this.confirm == this.password)) {
        this.isCompliant = true;
        this.submitForm();
      }
    }
    if (this.isLogin && this.password) {
      this.isCompliant = true;
      this.submitForm();
    }

    if (!this.isCompliant) {

    }
  }

  private submitForm() {
    this.isCompliant = false;
  }

  toggleButtonClicked() {
    this.isLogin = !this.isLogin;
  }

}
