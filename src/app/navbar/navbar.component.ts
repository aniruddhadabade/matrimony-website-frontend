import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean = false; 
  userName!: string | null;

  constructor(private router: Router) {}

  logout() {
    // Implement your logout logic here, like clearing user session data
    alert('Logout successfully!');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('loggedInUser'); // Clear session storage
    }
    this.router.navigate(['']); 
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userName = sessionStorage.getItem('loggedInUser');
    } else {
      this.userName = null; // Handle server-side rendering or other environments
    }
  }
  
}

