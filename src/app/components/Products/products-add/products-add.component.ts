import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
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
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-products-add",
  templateUrl: "./products-add.component.html",
  styleUrls: ["./products-add.component.scss"],
})
export class ProductsAddComponent implements OnInit {
  public formData = new FormData();

  image;
  productDetails = {
    _id: "",
    arName: "",
    enName: "",
    image: "",
    arDescription: "",
    enDescription: "",
    category_id: "",
    isNewProduct: true,
    isReplacement: true,
    sort: 0
  };
  providers = [];
  categories = [];

  product_id;
  note = "";
  imgs = [];
  showLoader = false;
  userType;

  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    // this.userType = localStorage.getItem("type");
    // if (this.userType != UserType.ADMIN) {
    //   this.productDetails.provider_id = localStorage.getItem("admin_id");
    // }
  }

  ngOnInit(): void {
    this.getAllProviders();
    this.getCategoy();
    this.getProductById();
  }

  getProductById() {
    this.route.params.subscribe((params: Params) => {
      let product_id = params["id"] == undefined ? null : params["id"];
      if (product_id) {
        this.product_id = product_id;
        this.helper.getSingleProduct(product_id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            let object = x[appConstant.ITEMS] as any;
            this.productDetails = object;
          } else this.toastr.error(x[appConstant.MESSAGE]);
        });
      }
    });
  }
  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  getCategoy() {
    this.helper.getCategoy().subscribe((x) => {
      this.categories = x[appConstant.ITEMS] as any[];
    });
  }

  saveProduct() {
    this.formData = new FormData();
    this.formData.append("_id", this.productDetails._id);
    this.formData.append("arName", this.productDetails.arName);
    this.formData.append("enName", this.productDetails.enName);
    this.formData.append("arDescription", this.productDetails.arDescription);
    this.formData.append("enDescription", this.productDetails.enDescription);
    this.formData.append("category_id", this.productDetails.category_id);
    this.formData.append("sort", String(this.productDetails.sort));
    this.formData.append(
      "isNewProduct",
      String(this.productDetails.isNewProduct)
    );
    this.formData.append(
      "isReplacement",
      String(this.productDetails.isReplacement)
    );

    if (this.product_id) {
      this.showLoader = true;
      this.helper
        .updateProduct(this.productDetails._id, this.formData)
        .subscribe((x) => {
          this.showLoader = false;
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
            this.formData = new FormData();
          }
        });
    } else {
      if (this.productDetails.image == "") {
        this.toastr.error("الرجاء ارفاق صورة المنتج ");
        return;
      }
      if (this.image) {
        this.formData.append("image", this.image);
      }
      this.showLoader = true;
      this.helper.addProduct(this.formData).subscribe((x) => {
        this.showLoader = false;
        if (x[appConstant.STATUS]) {
          this.toastr.success(x[appConstant.MESSAGE]);
          this.formData = new FormData();
        } else {
          this.toastr.error(x[appConstant.MESSAGE]);
          this.formData = new FormData();
        }
      });
    }
  }

  processImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.productDetails.image = reader.result as any;
      };
    }
  }
}
