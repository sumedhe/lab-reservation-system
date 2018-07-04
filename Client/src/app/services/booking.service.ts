import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:4200/api/bookings';

  postBooking(booking: Booking) {
    return this.http.post(this.baseURL, booking);
  }
}
