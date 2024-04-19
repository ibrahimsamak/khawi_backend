import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { MomentDateFormatter } from "../../../service/utils_function";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-earning",
  templateUrl: "./earning.component.html",
  styleUrls: ["./earning.component.scss"],
})
export class EarningComponent implements OnInit {
  momentFormat = new MomentDateFormatter();
  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    status: 'finished',
  };
  orders = [];
  stores = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  dt_from = "";
  dt_to = "";
  Admin_Total: 0;
  provider_Total: 0;
  Total: 0;
  userType;

  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.userType = localStorage.getItem("type");
   
  }

  ngOnInit(): void {
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  getOrder(page, limit, filter) {
    this.helper.getOrders(page, limit, filter).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.Admin_Total = x["Admin_Total"];
        this.provider_Total = x["provider_Total"];
        this.Total = x["Total"];
        this.collectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  updateOrder(id, status) {
    this.helper
      .updateOrderStatus(id, { statusId: status, notes: this.reaseon })
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        this.modalService.dismissAll();
        this.getOrder(0, this.limit, this.searchObject);
      });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper
      .getOrders(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagination"]["totalElements"];
        this.orders = arr;
        this.page = pageNum;
        this.Admin_Total = x["Admin_Total"];
        this.provider_Total = x["provider_Total"];
        this.Total = x["Total"];
      });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    this.modalService.open(content, { size: "lg" });
  }

  search() {
    this.page = 0;
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      this.searchObject.dt_from = dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      this.searchObject.dt_to = dt_to;
    }
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  changeStatus(statusId) {
    this.searchObject.status = statusId;
    this.page = 0;
    this.getOrder(this.page, this.limit, this.searchObject);
  }
  reset() {
    this.dt_from = "";
    this.dt_to = "";
    this.searchObject = {
      dt_from: "",
      dt_to: "",
      status: "finished",
    };
    this.page = 0;
    this.getOrder(this.page, this.limit, this.searchObject);
  }

  getOfferUser(item:any){
    let offers = item.offers.find(x=>String(x.status) == "accept_offer")
    console.log(offers)
    return offers && offers.user ? offers.user.full_name : ""
  }
}
