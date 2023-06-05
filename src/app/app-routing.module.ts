import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateformComponent } from './components/createform/createform.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate } from './utils/permission';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'form', canActivate: [canActivate], component: CreateformComponent },
  { path: 'home', canActivate: [canActivate], component: HomeComponent },
  { path: '**', canActivate: [canActivate], component: NotFoundComponent },
  // Add more routes for other pages if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
