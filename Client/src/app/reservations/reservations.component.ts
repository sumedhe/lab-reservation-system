import { Component, OnInit } from '@angular/core';

export interface Lab {
  name: string;
}

export interface Booking {
  labId: string;
  reason: string;
  name: string;
  startTime: Date;
  endTime: Date;
  status: string;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  // Booking data
  bookings: Booking[] = [
    { labId: '0001', reason: 'My Reason', name: 'Sumedhe', startTime: new Date(), endTime: new Date(), status: 'PENDING'},
    { labId: '0001', reason: 'My Reason', name: 'Sumedhe', startTime: new Date(), endTime: new Date(), status: 'PENDING'},
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

}
