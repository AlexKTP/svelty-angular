import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isButtonClicked = false;

  toggleButtonClicked() {
    this.isButtonClicked = !this.isButtonClicked;
  }

  getButtonLink() {
    return this.isButtonClicked ? '' : '/form'; // Replace with your desired route paths
  }
}
