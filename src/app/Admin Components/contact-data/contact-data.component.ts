import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from '../../services/contactinfo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrl: './contact-data.component.css'
})
export class ContactDataComponent implements OnInit{

  contacts: any[] = [];

  constructor(private contactService: ContactinfoService) {}

  ngOnInit(): void {
    this.fetchContactInfo();
  }

  fetchContactInfo(): void {
    this.contactService.getAllContacts().subscribe(
      data => {
        this.contacts = data;
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }

  deleteContact(id: number): void {
    console.log('Attempting to delete user with ID:', id); // Add this line for debugging
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContact(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.removeLocalContact(id); // Remove user from local list
          },
          error => {
            Swal.fire('Error!', 'Error deleting user.', 'error');
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  
  removeLocalContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }

}
