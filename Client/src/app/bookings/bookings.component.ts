import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { LabService } from '../services/lab.service';
import { Lab } from '../models/lab.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatTabChangeEvent } from '@angular/material';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: Booking[];
  bookingList = new Map<String, Booking[]>();
  labs: Lab[];
  selectedDatePicker: MatDatepickerInputEvent<Date>;
  selectedDate;
  selectedLab;

  constructor(private bookingService: BookingService, private labService: LabService) {
  }

  ngOnInit() {
    this.selectedDate = new Date();
    this.refreshLabList();
    this.refreshBookingList();
  }

  // Save Booking
  saveBooking(booking: Booking, check: boolean = true) {
    booking.date = this.selectedDate.toDateString();
    if (check) {
      this.checkTimeConflicts(booking);
    }

    if (booking._id === '') {
      // New booking
      this.bookingService.postBooking(booking).subscribe((res) => {
        console.log(res);
        this.refreshBookingList();
      }, (err) => {
        console.log(err.error);
      });
    } else {
      // Update booking
      this.bookingService.putBooking(booking).subscribe((res) => {
        console.log(res);
        this.refreshBookingList();
      }, (err) => {
        console.log(err.error);
      });
    }
  }

  // Delete a booking
  deleteBooking(booking: Booking) {
    if (confirm('Are you sure, you want to delete the reservation?') === true) {
      this.bookingService.deleteBooking(booking).subscribe((res) => {
        this.refreshBookingList();
      }, (err) => {
        console.log(err);
      });
    }
  }

  // Refresh Bookings
  refreshBookingList() {
    console.log('nn' + this.selectedDate.toDateString());
    this.bookingService.getBookingListByDate(this.selectedDate.toDateString()).subscribe((res) => {
      this.bookings = res as Booking[];
      this.labs.forEach(lab => {
        this.bookingList.set(lab.name, this.bookings.filter(book => book.labId === lab.name));
      });
      console.log(this.bookingList);
    }, (err) => {
      console.log(err);
    });
  }

  // Refresh Lab list
  refreshLabList() {
    this.labService.getLabList().subscribe((res) => {
      this.labs = res as Lab[];
    }, (err) => {
      console.log(err);
    });
  }


  // Change date
  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDatePicker = event;
    this.selectedDate = event;
  }

  // Change tab
  changeTab(event: MatTabChangeEvent) {
    this.selectedLab = this.labs[event.index].name;
  }

  // Add new booking
  addNewBooking() {
    console.log(this.selectedDate.toDateString());
    // Validate date
    const today = new Date();
    today.setDate(3);
    if (this.selectedDate < today) {
      alert('The date is passed!');
      return;
    }
    const booking = new Booking();
    booking._id = '';
    booking.labId = this.selectedLab;
    booking.reason = '(New reservation)';
    booking.name = 'Sumedhe Dissanayake';
    booking.date = this.selectedDate.toDateString();
    booking.startTime = '08:00';
    booking.endTime = '10:00';
    booking.status = 'PENDING';
    this.saveBooking(booking, false);
  }

  checkTimeConflicts(booking) {
    const bookings = this.bookingList.get(this.selectedLab);
    bookings.forEach(b => {
      if (b._id !== booking._id) {
        if ((b.startTime >= booking.startTime) && (b.startTime < booking.endTime) || (b.endTime > booking.startTime) && (b.endTime <= booking.endTime)) {
          alert('Time slot is already occupied');
          return;
        }
        console.log(booking.startTime + ' ' + booking.endTime + ' xxx');
        console.log(b.startTime + ' ' + b.endTime);
      }
    });
    console.log(bookings);
  }

  downloadReport() {
    const doc = new jsPDF();
      const col = ['Lab', 'Booked by', 'Reason', 'From', 'To'];

      doc.page = 1;

      let rows = [];

      this.bookings.forEach(e => {
       const temp = [e.labId, e.name, e.reason, e.startTime, e.endTime];
       rows.push(temp);
      });

    doc.autoTable(col, rows, { startY: 20 });
    doc.text('Reservation report ' + this.selectedDate.toDateString() , 10, 10);

   doc.page ++;
   doc.save('Report of ' + this.selectedDate.toDateString() + '.pdf');
  }
}
