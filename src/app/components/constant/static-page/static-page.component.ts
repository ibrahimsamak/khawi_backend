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

@Component({
  selector: "app-static-page",
  templateUrl: "./static-page.component.html",
  styleUrls: ["./static-page.component.scss"],
})
export class StaticPageComponent implements OnInit {
  staticPages = [];
  StaticObject = {
    _id: "",
    Type: "",
    arTitle: "",
    enTitle: "",
    arContent: "",
    enContent: "",
  };
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStaticPages();
  }

  getStaticPages() {
    this.helper.getStatic().subscribe((x) => {
      this.staticPages = x[appConstant.ITEMS] as any[];
    });
  }

  openStatic(content, obj) {
    this.helper.getSingleStatic(obj._id).subscribe((x) => {
      this.StaticObject = x[appConstant.ITEMS] as any;
      this.modalService.open(content, { size: "lg" });
    });
  }

  saveAction() {
    this.helper
      .updateStatic(this.StaticObject._id, this.StaticObject)
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.getStaticPages();
        }
        this.modalService.dismissAll();
      });
  }
}
