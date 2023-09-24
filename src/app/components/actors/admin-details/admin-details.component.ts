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
  selector: "app-admin-details",
  templateUrl: "./admin-details.component.html",
  styleUrls: ["./admin-details.component.scss"],
})
export class AdminDetailsComponent implements OnInit {
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
    this.url_list = appConstant.ADMIN_URL;
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
    console.log("1133");
    if (this.id) {
      //edit
      this.showLoader = true;
      this.helper.updateAdmin(this.id, this.userDetails).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
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
    } else {
      // add
      this.showLoader = true;
      this.helper.addAdmin(this.userDetails).subscribe(
        (x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
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

  getChecked(id) {
    let index = this.userDetails.roles.filter((x) => x.name == id);
    if (index.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  changeUrls(event, id, sort) {
    if (event.target.checked) {
      let object = {
        name: id,
        sort: sort,
      };
      this.userDetails.roles.push(object);
    } else {
      var i = this.userDetails.roles.map((x) => x.name).indexOf(id);
      if (i != -1) {
        this.userDetails.roles.splice(i, 1);
      }
    }
  }
}
