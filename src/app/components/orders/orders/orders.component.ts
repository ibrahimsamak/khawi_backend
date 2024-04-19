import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");
import { MomentDateFormatter } from "../../../service/utils_function";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  momentFormat = new MomentDateFormatter();

  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    status: 1,
    order_no: "",
  };
  dt_from: "";
  dt_to: "";
  orders = [];
  stores = [];
  employees = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  userType;
  size = 0;
  employee_id;
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
        this.collectionCount = x["pagination"]["totalElements"];
        this.size = x["pagination"]["size"];
        this.orders = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  updateOrder(id, status) {
    var data = {};
    if (status == 2) data = { employee_id: this.employee_id, status: status };
    else data = { statusId: status, notes: this.reaseon };
    this.helper.updateOrderStatus(id, data).subscribe(
      (x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.toastr.success(x[appConstant.MESSAGE]);
        }
        this.modalService.dismissAll();
        if (this.size == 1 && this.page != 1) this.page = this.page - 2;
        else this.page = this.page - 1;
        this.getOrder(this.page, this.limit, this.searchObject);
      },
      (error) => {
        this.helper.serverSideErrorHandler(error);
      }
    );
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
      });
  }

  openOrder(content, obj) {
    this.orderDetails = obj;
    this.modalService.open(content, { size: "lg" });
  }

  openOrderDriver(content, obj) {
    this.helper.getEmployeesByStore(obj.supplier_id._id).subscribe((x) => {
      this.employees = x[appConstant.ITEMS] as any[];
      this.orderDetails = obj;
      this.modalService.open(content, { size: "lg" });
    });
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
      status: 1,
      order_no: "",
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
