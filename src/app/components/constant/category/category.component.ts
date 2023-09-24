import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-styles",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  styles = [];
  reasonObject = {
    _id: "",
    arName: "",
    enName: "",
    sort: 0,
  };
  type = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.helper.getCategoy().subscribe((x) => {
      this.styles = x[appConstant.ITEMS] as any[];
    });
  }

  openStyles(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleCategoy(obj._id).subscribe((x) => {
        this.reasonObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.reasonObject = {
        _id: "",
        arName: "",
        enName: "",
        sort: 0,
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  saveAction() {
    if (this.type == "edit") {
      this.helper
        .updateCategoy(this.reasonObject._id, this.reasonObject)
        .subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.getCategories();
          }
          this.modalService.dismissAll();
        });
    } else {
      this.helper.addCategoy(this.reasonObject).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getCategories();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteStyle(id) {
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
        this.helper.deleteCategoy(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getCategories();
        });
      }
    });
  }
}
