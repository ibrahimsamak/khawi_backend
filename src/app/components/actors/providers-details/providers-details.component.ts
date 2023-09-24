import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
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
  selector: "app-designers-details",
  templateUrl: "./providers-details.component.html",
  styleUrls: ["./providers-details.component.scss"],
})
export class ProvidersDetailsComponent implements OnInit {
  public formData = new FormData();

  userDetails = {
    _id: "",
    name: "",
    image: "",
    email: "",
    password: "",
    phone_number: "",
    os: "",
    cities: [],
    details: "",
    orderPercentage: 0,
  };
  cover = null;
  image = null;
  countries = [];
  citiesArray = [];

  orders = [];
  times = [];
  followings = [];

  timePage = 0;
  timeLimit = 10;
  timeCollectionCount;
  timeSize = 0;

  orderPage = 0;
  orderLimit = 10;
  orderCollectionCount = 0;

  followPage = 0;
  followLimit = 10;
  followCollectionCount;

  user_id;
  note = "";
  showLoader = false;
  orderDetails;
  userType;

  time = {
    _id: "",
    from: "",
    to: "",
    supplier_id: "",
  };
  type = "";
  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.userType = localStorage.getItem("type");
  }

  ngOnInit(): void {
    this.getAllCity();
    this.getUserById();
  }

  getTimes(id) {
    this.helper.getTimeProviderList(id).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        this.times = x[appConstant.ITEMS] as any[];
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  getOrders(id, page, limit) {
    if (id)
      this.helper.getProviderOrders(id, page, limit).subscribe((x) => {
        if (x[appConstant.STATUS]) this.orders = x[appConstant.ITEMS] as any[];
        else this.toastr.error(x[appConstant.MESSAGE]);
      });
  }

  getUserById() {
    this.route.params.subscribe((params: Params) => {
      let user_id = params["id"] == undefined ? null : params["id"];
      if (user_id) {
        this.user_id = user_id;
        this.helper.getSingleProvider(user_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.userDetails = object;
            this.orders = [];
            this.followings = [];
            // this.times = [];
            this.getTimes(this.user_id);
            this.getOrders(this.user_id, this.orderPage, this.orderLimit);
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }

  getAllCity() {
    this.helper.getAllCityAdmin().subscribe((x) => {
      this.citiesArray = x[appConstant.ITEMS] as any[];
    });
  }

  saveUser() {
    this.formData = new FormData();

    this.formData.append("_id", this.userDetails._id);
    this.formData.append("name", this.userDetails.name);
    this.formData.append("cities", JSON.stringify(this.userDetails.cities));
    this.formData.append("phone_number", this.userDetails.phone_number);
    this.formData.append("email", this.userDetails.email);
    this.formData.append("details", this.userDetails.details);
    this.formData.append("password", this.userDetails.password);
    this.formData.append(
      "orderPercentage",
      String(this.userDetails.orderPercentage)
    );
    this.formData.append("image", this.image);
    var roles = [];

    roles = [];
    appConstant.DESIGNER_URL.forEach((element) => {
      let obj = {
        name: element.id,
        sort: element.sort,
      };
      roles.push(obj);
    });

    this.formData.append("roles", JSON.stringify(roles));

    if (this.user_id) {
      this.showLoader = true;
      this.helper.updateProviders(this.formData).subscribe(
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
      this.helper.addProviders(this.formData).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.user_id = x[appConstant.ITEMS]["_id"];
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
      this.orderPage = 0;
      this.orderLimit = 10;
      this.orderCollectionCount = 0;
      this.getOrders(this.user_id, this.orderPage, this.orderLimit);
    }
    if ($event.nextId === "tab-comments") {
      this.getTimes(this.user_id);
    }
  }

  public onOrderPageChange(pageNum: number): void {
    this.orderPage = pageNum - 1;
    this.helper
      .getProviderOrders(this.user_id, this.orderPage, this.orderLimit)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.orderCollectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.orderPage = pageNum;
      });
  }

  deleteTime(id) {
    Swal.fire({
      title: "تحذير",
      text: "هل انت متأكد من حذف العنصر؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.value) {
        this.helper.deleteTime(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getTimes(this.user_id);
        });
      }
    });
  }

  openDetails(content, obj) {
    if (obj) {
      this.type = "edit";
      this.time = obj;
    } else {
      this.time = {
        _id: "",
        from: "",
        to: "",
        supplier_id: this.user_id,
      };
    }
    this.modalService.open(content, { size: "lg" });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    this.modalService.open(content, { size: "lg" });
  }

  saveTime() {
    if (this.type == "edit") {
      this.helper.updateTime(this.time._id, this.time).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.modalService.dismissAll();
          this.getTimes(this.user_id);
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    } else {
      this.helper.addTime(this.time).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.modalService.dismissAll();
          this.getTimes(this.user_id);
        },
        (error) => {
          this.showLoader = false;
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }
}
