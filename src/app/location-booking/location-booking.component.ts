import { Component } from '@angular/core';

interface Booking {
  location: string;
  date: string;
  details: string;
}
@Component({
  selector: 'app-location-booking',
  templateUrl: './location-booking.component.html',
  styleUrl: './location-booking.component.css'
})
export class LocationBookingComponent {
  locations: string[] = [ 'Udaipur, Rajasthan', 'Jaipur, Rajasthan', 'Goa', 'Jodhpur, Rajasthan' ,' Kerala' ,'Agra, Uttar Pradesh' ,' Rishikesh, Uttarakhand',
  'Andaman and Nicobar Islands',' Shimla, Himachal Pradesh', 'Hyderabad, Telangana' ,'Jaisalmer, Rajasthan' ,'Neemrana, Rajasthan'
];
booking: Booking = {
  location: '',
  date: '',
  details: ''
};

constructor() {}

onSubmit() {
  if (this.booking.location && this.booking.date) {
    // Handle booking logic here, for example, send data to the backend
    // console.log('Booking Details:', this.booking);
    alert('Location booked successfully!');
    this.resetForm();
  } else {
    alert('Please fill out all required fields.');
  }
}

resetForm() {
  this.booking = {
    location: '',
    date: '',
    details: ''
  };
}
}
