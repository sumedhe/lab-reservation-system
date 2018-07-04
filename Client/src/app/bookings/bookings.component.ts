import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';

export interface Lab {
  name: string;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  // Booking data
  bookings: Booking[];

  // Labs data
  labs: Lab[] = [
    { name: 'W001'},
    { name: 'W002'},
    { name: '4th Floor'},
    { name: 'Mini Auditorium'},
  ];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.refreshBookingList();
  }

  // Save Booking
  saveBooking(booking: Booking) {
    if (booking._id === '') {
      // New booking
      this.bookingService.postBooking(booking).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err.error);
      });
    } else {
      // Update booking
      this.bookingService.putBooking(booking).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err.error);
      });
    }
    this.refreshBookingList();
  }

  // Refresh Bookings
  refreshBookingList() {
    this.bookingService.getBookingList().subscribe((res) => {
      this.bookings = res as Booking[];
    }, (err) => {
      console.log(err);
    });
  }

  deleteBooking(booking: Booking) {
    if (confirm('Are you sure, you want to delete the reservation?') === true) {
      this.bookingService.deleteBooking(booking).subscribe((res) => {
        console.log('Deleted');
        const index: number = this.bookings.indexOf(booking);
        if (index !== -1) {
            this.bookings.splice(index, 1);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

}
