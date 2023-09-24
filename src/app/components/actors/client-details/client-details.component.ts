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
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.scss"],
})
export class ClientDetailsComponent implements OnInit {
  public formData = new FormData();
  public zoom_m1: number = 13;

  user_address = {};
  discount = 0;
  userDetails = {
    _id: "",
    full_name: "",
    image: "",
    email: "",
    address: "",
    phone_number: "",
    os: "",
    city_id: "",
    country_id: "",
  };
  countries = [];
  cities = [];

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
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getUserById();
  }

  getUserAddress(id, page, limit) {
    this.helper.getUserAddress(id, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.addresses = x[appConstant.ITEMS] as any[];
        this.rateCollectionCount = x["pagenation"]["totalElements"];
        this.rateSize = x["pagenation"]["size"];
        this.ratePage = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getOrders(id, page, limit) {
    this.helper.getUserOrders(id, page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
      else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleUser(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.orders = [];
            this.followings = [];
            this.addresses = [];
            if (object.country_id) this.getCityByCountryId(object.country_id);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
        this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
        this.getOrders(this.user_id, this.orderPage, this.orderLimit);
      }
    });
  }
  getAllCountries() {
    this.helper.getCountry().subscribe((x) => {
      this.countries = x[appConstant.ITEMS] as any[];
    });
  }

  getCityByCountryId(country_id) {
    this.helper.getAllCity(country_id).subscribe((x) => {
      this.cities = x[appConstant.ITEMS] as any[];
    });
  }
  onOptionsSelected(val) {
    let counrty_id = val.target.value;
    this.getCityByCountryId(counrty_id);
  }

  saveUser() {
    this.formData.append("_id", this.userDetails._id);
    this.formData.append("full_name", this.userDetails.full_name);
    this.formData.append("country_id", this.userDetails.country_id);
    this.formData.append("city_id", this.userDetails.city_id);
    this.formData.append("os", this.userDetails.os);
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("address", this.userDetails.address);
    this.formData.append("email", this.userDetails.email);

    this.showLoader = true;
    this.helper.updateUser(this.formData).subscribe(
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

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.formData.append("image", event.target.files[0]);
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
    if ($event.nextId === "tab-addresses") {
      // $event.preventDefault();
      this.ratePage = 0;
      this.rateLimit = 10;
      this.rateCollectionCount = 0;
      this.rateSize = 0;
      this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getUserOrders(this.user_id, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
      });
  }

  public onRatePageChange(pageNum: number): void {
    this.ratePage = pageNum - 1;
    this.helper
      .getUserAddress(this.user_id, this.ratePage, this.rateLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.rateCollectionCount = x["pagenation"]["totalElements"];
        this.addresses = arr;
        this.ratePage = pageNum;
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

  saveDiscount() {
    this.helper
      .addAddressDiscount(this.user_address["_id"], {
        discount: this.user_address["discount"],
      })
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        if (this.rateSize == 1 && this.ratePage != 1)
          this.ratePage = this.ratePage - 2;
        else this.ratePage = this.ratePage - 1;
        this.getUserAddress(this.user_id, this.ratePage, this.rateLimit);
      });
  }
}
