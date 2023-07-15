import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateformComponent } from './components/createform/createform.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate } from './utils/permission';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  { path: 'register', component: LoginComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'form', canActivate: [canActivate], component: CreateformComponent },
  { path: 'home', canActivate: [canActivate], component: HomeComponent, data: { animation: 'home <=> form' } },
  { path: 'profile', canActivate: [canActivate], component: ProfileComponent },
  { path: 'import', canActivate: [canActivate], component: ImportComponent, data: { animation: 'home <=> import' } },
  { path: '**', canActivate: [canActivate], component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
