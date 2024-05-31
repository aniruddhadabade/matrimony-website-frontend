import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserinfoService } from '../services/userinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users: any[] = [];
  totalGrooms: number = 0;
  totalBrides: number = 0;
  totalRegistrations: number = 0;

  constructor(private userService: UserinfoService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDashboardData();
  }

  fetchUsers(): void {
    this.userService.getAdmin().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout() {
    alert('Logout successfully!');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('loggedInUser');
    }
    this.router.navigate(['']);
  }

  fetchDashboardData() {
    this.userService.getAllUser().subscribe(
      (userInfo: any[]) => {
        this.totalGrooms = userInfo.filter(reg => reg.gender === 'Male').length;
        this.totalBrides = userInfo.filter(reg => reg.gender === 'Female').length;
        this.totalRegistrations = userInfo.length;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  updateUser(user: any): void {
    Swal.fire({
      title: 'Update User',
      html: `
        <input type="text" id="firstName" class="swal2-input" placeholder="First Name" value="${user.firstName}">
        <input type="text" id="lastName" class="swal2-input" placeholder="Last Name" value="${user.lastName}">
        <input type="text" id="age" class="swal2-input" placeholder="Age" value="${user.age}">
        <input type="date" id="dateOfBirth" class="swal2-input" placeholder="Date of Birth" value="${user.dateOfBirth}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
        const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
        const age = parseInt((document.getElementById('age') as HTMLInputElement).value, 10);
        const dateOfBirth = (document.getElementById('dateOfBirth') as HTMLInputElement).value;

        if (!firstName || !lastName || isNaN(age) || !dateOfBirth) {
          Swal.showValidationMessage('Please enter valid values for all fields.');
          return false;
        }
        return { ...user, firstName, lastName, age, dateOfBirth };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(result.value).subscribe(
          () => {
            Swal.fire('Updated!', 'User details have been updated.', 'success');
            this.updateLocalUser(result.value); // Update local user list
          },
          error => {
            Swal.fire('Error!', 'Error updating user details.', 'error');
            console.error('Error updating user:', error);
          }
        );
      }
    });
  }

  updateLocalUser(updatedUser: any): void {
    const index = this.users.findIndex(user => user.userId === updatedUser.userId);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(userId: number): void {
    console.log('Attempting to delete user with ID:', userId); 
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            // Upon successful deletion from the backend, remove from local list
            this.removeLocalUser(userId);
          },
          error => {
            Swal.fire('Error!', 'Error deleting user.', 'error');
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }
  
  removeLocalUser(userId: number): void {
    // Remove the user from the local array
    this.users = this.users.filter(user => user.userId !== userId);
  }


}