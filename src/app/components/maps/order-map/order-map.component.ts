import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "src/app/service/ConstantServiceWrapper.service";

@Component({
  selector: "app-order-map",
  templateUrl: "./order-map.component.html",
  styleUrls: ["./order-map.component.scss"],
})
export class OrderMapComponent implements OnInit {
  searchObject = {
    status_id: 1,
  };

  // Map1
  public lat_m1: number = 20.593683;
  public lng_m1: number = 78.962883;
  public zoom_m1: number = 15;

  public markers: marker[] = [];

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  public mapClicked(e) {}

  ngOnInit() {
    this.changeStatus();
  }

  changeStatus() {
    this.helper.getOrdersMap(this.searchObject.status_id).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        arr.forEach((element) => {
          let obj = {
            lat: element.lat,
            lng: element.lng,
            label: "",
            nameData: element.user_id.full_name + " - " + element.employee_id ? element.employee_id.full_name : "",
            draggable: false,
          };
          this.markers.push(obj);
          this.lat_m1 = element.lat;
          this.lng_m1 = element.lng;
        });
      } else {
        this.toastr.error(x[appConstant.MESSAGE]);
      }
    });
  }

  search() {
    this.changeStatus();
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  nameData: String;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}
