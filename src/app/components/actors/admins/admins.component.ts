import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.scss"],
})
export class AdminsComponent implements OnInit {
  admins = [];
  type = "";
  page = 0;
  limit = 20;
  size = 0;
  collectionCount;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdmins(this.page, this.limit);
  }

  getAdmins(page, limit) {
    this.helper.getAdmins(page, limit).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagenation"]["totalElements"];
        this.size = x["pagenation"]["size"];
        this.admins = arr;
        this.page = page + 1;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  public onPageChange(pageNum: number): void {
    this.page = pageNum - 1;
    this.helper.getAdmins(this.page, this.limit).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        this.collectionCount = x["pagenation"]["totalElements"];
        this.admins = arr;
        this.page = pageNum;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  deleteAdmin(id) {
    Swal.fire({
      title: "تحذير",
      text: "هل انت متأكد من حذف العنصر؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
      // animation: false,
      // customClass: "animated tada",
    }).then((result) => {
      if (result.value) {
        this.helper.deleteAdmin(id).subscribe(
          (x) => {
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.toastr.success(x[appConstant.MESSAGE]);
            }
            if (this.size == 1 && this.page != 1) this.page = this.page - 2;
            else this.page = this.page - 1;

            this.getAdmins(this.page, this.limit);
          },
          (error) => {
            this.helper.serverSideErrorHandler(error);
          }
        );
      }
    });
  }

  addNewAdmin() {
    this.router.navigate(["/users/admins/details"]);
  }
  editAdmin(id) {
    this.router.navigate(["/users/admins/details/" + id]);
  }
}
