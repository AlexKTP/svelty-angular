import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Add event listeners to each nav link
    navLinks.forEach(navLink => {
      this.renderer.listen(navLink, 'mouseover', () => {
        this.renderer.addClass(navLink, 'active'); // Add the 'active' class on mouseover
      });

      this.renderer.listen(navLink, 'mouseout', () => {
        this.renderer.removeClass(navLink, 'active'); // Remove the 'active' class on mouseout
      });
    });

  }

  navigateToForm() {
    this.router.navigate(['/form'], { state: { animation: 'home <=> form' } });
  }


}
