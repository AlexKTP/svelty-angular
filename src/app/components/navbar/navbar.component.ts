import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(private router: Router, private renderer: Renderer2, private authService: AuthService, private logger: LoggerService) {
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
    this.authService.logOut().subscribe({
      next: (nextValue) => {
        localStorage.clear();
        this.logger.info(NavbarComponent.name + ' User logged out!')
      },
      error: (errorValue) => {
        this.logger.error(NavbarComponent.name + ' Error logging out!')
      },
      complete: () => {
        this.router.navigate(['/login'])
        this.logger.info(NavbarComponent.name + ' Logout completed!')
      }
    });
  }


  navigateToForm() {
    this.router.navigate(['/form'], { state: { animation: 'home <=> form' } });
  }

  navigateToImport() {
    this.router.navigate(['/import'], { state: { animation: 'home <=> import' } });
  }


}
