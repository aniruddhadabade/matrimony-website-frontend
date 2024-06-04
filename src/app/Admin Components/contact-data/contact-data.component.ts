import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from '../../services/contactinfo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})
export class ContactDataComponent implements OnInit {

  contacts: any[] = [];

  constructor(private contactService: ContactinfoService) {}

  ngOnInit(): void {
    this.fetchContactInfo();
  }

  fetchContactInfo(): void {
    this.contactService.getAllContacts().subscribe(
      data => {
        console.log('Fetched contacts:', data); // Log the fetched data
        this.contacts = data;
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }

  deleteContact(contactId: number): void {
    console.log('Attempting to delete user with ID:', contactId); // Log the ID

    if (contactId === undefined || contactId === null) {
      console.error('Invalid ID:', contactId);
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContact(contactId).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.removeLocalContact(contactId); // Remove user from local list
          },
          error => {
            Swal.fire('Error!', 'Error deleting user.', 'error');
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  removeLocalContact(contactId: number): void {
    this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
  }

}
