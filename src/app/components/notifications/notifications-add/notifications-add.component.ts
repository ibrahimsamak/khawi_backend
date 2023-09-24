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

@Component({
  selector: "app-notifications-add",
  templateUrl: "./notifications-add.component.html",
  styleUrls: ["./notifications-add.component.scss"],
})
export class NotificationsAddComponent implements OnInit {
  notificationsDetails = {
    title: "",
    msg: "",
    type: "1",
  };
  showLoader = false;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  send() {
    this.showLoader = true;
    this.helper.addNotifications(this.notificationsDetails).subscribe((x) => {
      this.showLoader = false;
      if (x[appConstant.STATUS] != true) {
        this.toastr.error(x[appConstant.MESSAGE]);
      } else {
        this.toastr.success(x[appConstant.MESSAGE]);
      }
      this.notificationsDetails = { title: "", msg: "", type: "1" };
    });
  }
}
