import { Component, OnInit } from "@angular/core";
import { appConstant } from "src/app/service/appConstant";
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
import * as jsonexport from "jsonexport/dist";
import { ActivatedRoute, Params } from "@angular/router";
import { add } from "date-fns/fp";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: ["./admin-profile.component.scss"],
})
export class AdminProfileComponent implements OnInit {
  url_list = [];
  userDetails = {
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    roles: [],
  };
  id;
  showLoader = false;
  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"] == undefined ? null : params["id"];
      if (this.id) {
        this.helper.getSingleAdmins(this.id).subscribe((x) => {
          if (x[appConstant.STATUS])
            this.userDetails = x[appConstant.ITEMS] as any;
          else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }

  saveUser() {
    //edit
    this.showLoader = true;
    this.helper.updateMyProfile(this.id, this.userDetails).subscribe(
      (x) => {
        this.showLoader = false;
        if (x[appConstant.STATUS]) {
          let obj = x[appConstant.ITEMS] as any;
          localStorage.setItem("admin_username", obj.full_name);
          this.toastr.success(x[appConstant.MESSAGE]);
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
        }
      },
      (error) => {
        this.showLoader = false;
        this.helper.serverSideErrorHandler(error);
      }
    );
  }
}
