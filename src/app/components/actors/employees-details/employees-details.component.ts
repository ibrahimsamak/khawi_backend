import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
  NgbTabChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
import { ActivatedRoute, Params } from "@angular/router";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-employees-details",
  templateUrl: "./employees-details.component.html",
  styleUrls: ["./employees-details.component.scss"],
})
export class EmployeesDetailsComponent implements OnInit {
  public formData = new FormData();
  public zoom_m1: number = 13;

  user_address = {};
  discount = "0";
  cities = [];
  places = [];
  userDetails = {
    _id: "",
    full_name: "",
    image: "",
    email: "",
    address: "",
    phone_number: "",
    os: "",
    supplier_id: "",
    password: "",
    place_id: "",
    city_id: "",
  };
  countries = [];
  providers = [];

  orders = [];
  addresses = [];
  followings = [];

  ratePage = 0;
  rateLimit = 10;
  rateCollectionCount;
  rateSize = 0;

  orderPage = 0;
  orderLimit = 10;
  orderCollectionCount = 0;

  followPage = 0;
  followLimit = 10;
  followCollectionCount;

  user_id;
  note = "";
  orderDetails = {};
  showLoader = false;
  image = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProviders();
    this.getUserById();
  }

  getOrders(id, page, limit) {
    this.helper.getEmployeesOrders(id, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleEmployee(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.changeSupplier(this.userDetails.supplier_id);
            this.orders = [];
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
        this.getOrders(this.user_id, this.orderPage, this.orderLimit);
      }
    });
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  saveUser() {
    this.formData = new FormData();
    this.formData.append("_id", this.userDetails._id);
    this.formData.append("full_name", this.userDetails.full_name);
    this.formData.append("os", this.userDetails.os);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("address", this.userDetails.address);
    this.formData.append("email", this.userDetails.email);
    this.formData.append("password", this.userDetails.password);
    this.formData.append("image", this.image);

    this.formData.append("supplier_id", this.userDetails.supplier_id);
    this.formData.append("city_id", this.userDetails.city_id);
    this.formData.append("place_id", this.userDetails.place_id);

    if (this.user_id) {
      this.showLoader = true;
      this.helper.updateEmployee(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          }
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      if (this.userDetails.image == "") {
        this.toastr.error("الرجاء ارفاق الصورة ");
        return;
      }
      this.showLoader = true;
      this.helper.addEmployee(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          }
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.userDetails.image = reader.result as any;
      };
    }
  }

  public beforeChange($event: NgbTabChangeEvent) {
    console.log($event);
    if ($event.nextId === "tab-orders") {
      // $event.preventDefault();
      this.orderPage = 0;
      this.orderLimit = 10;
      this.orderCollectionCount = 0;
      this.getOrders(this.user_id, this.orderPage, this.orderLimit);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getEmployeesOrders(this.user_id, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
      });
  }

  openDetails(content, obj) {
    this.user_address = obj;
    this.modalService.open(content, { size: "lg" });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    this.modalService.open(content, { size: "lg" });
  }

  changeSupplier(event) {
    console.log(event);
    let supplier = this.providers.find((x) => x._id == event);
    // let suplier_id = event;
    if (supplier) {
      this.userDetails.supplier_id = supplier._id;
      this.cities = supplier.cities;
    }
    if(this.user_id){
      this.changeCity(this.userDetails.city_id);
    }
    // console.log(this.cities);
  }

  changeCity(event) {
    let city = this.cities.find((x) => x._id == event);
    // let suplier_id = event;
    if (city) {
      this.userDetails.city_id = city._id;
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
      });
    }
    // console.log(this.cities);
  }
}
