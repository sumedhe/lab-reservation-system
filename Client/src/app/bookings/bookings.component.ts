import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';

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
  bookings: Booking[] = [
    { _id: '', labId: '0001', reason: 'My Reason', name: 'Sumedhe', startTime: new Date(), endTime: new Date(), status: 'PENDING'},
    { _id: '', labId: '0001', reason: 'My Reason', name: 'Sumedhe', startTime: new Date(), endTime: new Date(), status: 'PENDING'},
  ];

  // Labs data
  labs: Lab[] = [
    { name: 'W001'},
    { name: 'W002'},
    { name: '4th Floor'},
    { name: 'Mini Auditorium'},
  ];

  constructor() { }

  ngOnInit() {
  }

  saveBooking(booking: Booking) {
    console.log(booking);
  }

}
