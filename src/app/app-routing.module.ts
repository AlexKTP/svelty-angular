import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateformComponent } from './components/createform/createform.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', component: CreateformComponent },
  // Add more routes for other pages if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
