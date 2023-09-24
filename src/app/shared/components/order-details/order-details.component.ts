import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsPoPComponent implements OnInit {
  @Input() orderDetails: any;
  zoom_m1 = 18;
  origin;
  destination;

  constructor() {}

  ngOnInit(): void {
    this.origin = {
      lat: this.orderDetails?.employee_id?.lat,
      lng: this.orderDetails?.employee_id?.lng,
    };
    this.destination = {
      lat: this.orderDetails?.lat,
      lng: this.orderDetails?.lng,
    };
  }
}
