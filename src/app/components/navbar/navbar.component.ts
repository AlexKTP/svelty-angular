import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(private router: Router, private renderer: Renderer2, private heroService: HeroesService) {
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

  logOut() {
    this.heroService.logOut();
  }


  navigateToForm() {
    this.router.navigate(['/form'], { state: { animation: 'home <=> form' } });
  }


}
