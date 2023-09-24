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
  selector: "app-social-media",
  templateUrl: "./social-media.component.html",
  styleUrls: ["./social-media.component.scss"],
})
export class SocialMediaComponent implements OnInit {
  contacts = [];
  contactObject = {
    _id: "",
    arName: "",
    enName: "",
    data: "",
  };
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getContactOptions();
  }

  getContactOptions() {
    this.helper.getContact().subscribe((x) => {
      this.contacts = x[appConstant.ITEMS] as any[];
    });
  }

  openSettings(content, obj) {
    this.helper.getSingleContact(obj._id).subscribe((x) => {
      this.contactObject = x[appConstant.ITEMS] as any;
      this.modalService.open(content, { size: "lg" });
    });
  }

  saveAction() {
    this.helper
      .updateContact(this.contactObject._id, this.contactObject)
      .subscribe((x) => {
        if (x[appConstant.STATUS] != true) {
          this.toastr.error(x[appConstant.MESSAGE]);
        } else {
          this.getContactOptions();
        }
        this.modalService.dismissAll();
      });
  }
}
