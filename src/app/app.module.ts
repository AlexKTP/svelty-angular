import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateformComponent } from './components/createform/createform.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImportComponent } from './components/import/import.component';
import { DragndropComponent } from './components/dragndrop/dragndrop.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateformComponent,
    HomeComponent,
    LoginComponent,
    HeroComponent,
    DashboardComponent,
    NotFoundComponent,
    ToastComponent,
    ToasterComponent,
    ProfileComponent,
    ImportComponent,
    DragndropComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
