import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/models/event-types';
import { IHero } from 'src/app/models/hero.interface';
import { AuthServiceComponent } from 'src/app/services/auth-service/auth-service.component';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { ToastService } from 'src/app/services/toast/toast.service';



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

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceComponent, private router: Router, private logger: LoggerService, private toastService: ToastService) { }

  // Add the validator to the form builder
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {});

    this.confirmationPasswordValidationReason = this.getConfirmationPasswordValidationReason();

    if (localStorage.getItem('svelty-token') != null && typeof localStorage.getItem('svelty-token') == 'string') {
      this.router.navigate(['/form'])
    }
  }

  registerFormSubmit() {

    if (this.isLogin) {
      this.logger.info(LoginComponent.name + ' Log in Attemp...')
      this.authService.login(this.registerForm.get('name')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
        value => {
          this.token = value?.token
          if (this.token.length > 0) {
            localStorage.clear;
            localStorage.setItem('svelty-token', this.token)
            const heroJson = JSON.parse(value.hero);

            var hero: IHero = {
              id: heroJson?.id,
              name: heroJson?.username,
              login: heroJson?.login,
              creationDate: new Date(heroJson?.creationDate),
              lastModification: new Date(heroJson?.lastModificationDate)
            }

            this.toastService.showToast('LOGGED IN', 'Welcome back hero!', EventTypes.Info)

            localStorage.setItem('svelty-hero-id', hero?.id)
            this.logger.info(LoginComponent.name + ' Logged in successfully!')
            this.router.navigate(['/home'])
          }

        },
        error => {
          this.toastService.showToast('ERROR', 'Oops! Something goes wrong!', EventTypes.Error)
          this.logger.error(LoginComponent.name + ' ' + error.message + ' ' + error.status)
          this.router.navigate(['/'])
        },
        () => {
          // nothing to do during the complete state
        }
      )
    } else {
      this.authService.register(this.registerForm.get('name')?.value, this.registerForm.get('password')?.value, this.registerForm.get('email')?.value).subscribe(
        {
          next: (nextValue) => {
            this.isLogin = true;
            this.router.navigate(['/register'])
            this.toastService.showToast('REGISTERED', 'Welcome, please log in', EventTypes.Info)
          },
          error: (error) => {
            this.logger.error(LoginComponent.name + ' ' + error.message + ' ' + error.status)
          },
          complete: () => {
            // Handle completion
          }
        }
      );
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
