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
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-reasons",
  templateUrl: "./reasons.component.html",
  styleUrls: ["./reasons.component.scss"],
})
export class ReasonsComponent implements OnInit {
  reasons = [];
  reasonObject = {
    _id: "",
    arName: "",
    enName: "",
  };
  type = "";
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getReasons();
  }

  getReasons() {
    this.helper.getReason().subscribe((x) => {
      this.reasons = x[appConstant.ITEMS] as any[];
    });
  }

  openReasons(content, obj) {
    if (obj) {
      this.type = "edit";
      this.helper.getSingleReason(obj._id).subscribe((x) => {
        this.reasonObject = x[appConstant.ITEMS] as any;
        this.modalService.open(content, { size: "lg" });
      });
    } else {
      this.type = "add";
      this.reasonObject = {
        _id: "",
        arName: "",
        enName: "",
      };
      this.modalService.open(content, { size: "lg" });
    }
  }

  saveAction() {
    if (this.type == "edit") {
      this.helper
        .updateReason(this.reasonObject._id, this.reasonObject)
        .subscribe(
          (x) => {
            if (x[appConstant.STATUS] != true) {
              this.toastr.error(x[appConstant.MESSAGE]);
            } else {
              this.getReasons();
            }
            this.modalService.dismissAll();
          },
          (error) => {
            this.helper.serverSideErrorHandler(error);
          }
        );
    } else {
      this.helper.addReason(this.reasonObject).subscribe(
        (x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.getReasons();
          }
          this.modalService.dismissAll();
        },
        (error) => {
          this.helper.serverSideErrorHandler(error);
        }
      );
    }
  }

  deleteReason(id) {
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
        this.helper.deleteReason(id).subscribe((x) => {
          if (x[appConstant.STATUS] != true) {
            this.toastr.error(x[appConstant.MESSAGE]);
          } else {
            this.toastr.success(x[appConstant.MESSAGE]);
          }
          this.getReasons();
        });
      }
    });
  }
}
