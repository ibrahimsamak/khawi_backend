import { Component, OnInit, Output } from "@angular/core";
import { ProductsService } from "../../../shared/services/e-commerce/products.service";
import {
  Products,
  ColorFilter,
  ProductColor,
  ProductTags,
  TagFilter,
} from "../../../shared/model/e-commerce/product.model";
import { CartService } from "../../../shared/services/e-commerce/cart.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WishListService } from "../../../shared/services/e-commerce/wish-list.service";
import { ConstantServiceWrapper } from "../../../../app/service/ConstantServiceWrapper.service";
import { ToastrService } from "ngx-toastr";
// import { appConstant, UserType } from "src/app/service/appConstant";
import { Image } from "@ks89/angular-modal-gallery";
declare var require: any;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";
import { Router } from "@angular/router";
import { appConstant, UserType } from "../../../service/appConstant";

@Component({
  selector: "app-places-product",
  templateUrl: "./places-product.component.html",
  styleUrls: ["./places-product.component.scss"],
})
export class PlacesProductComponent implements OnInit {
  productDetail = {};
  showLoader = false;
  totalElements = 0;
  show: boolean = false;

  products = [];
  page = 0;
  limit = 12;
  userType;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private modalService: NgbModal,
    private wishService: WishListService,
    private helper: ConstantServiceWrapper,
    private toastr: ToastrService,
    private router: Router,
    private ProductsService: ProductsService
  ) {
    //console.log(ProductsService.currency);
    // this.userType = localStorage.getItem("type");
    // if (this.userType == UserType.STORE) {
    //   this.searchObject.user_id = localStorage.getItem("admin_id");
    // }
  }

  sidebaron: boolean = false;
  open: boolean = false;
  public listView: boolean = false;
  public col_xl_12: boolean = false;
  public col_xl_2: boolean = false;

  public col_sm_3: boolean = false;
  public col_xl_3: boolean = true;
  public xl_4: boolean = true;
  public col_sm_4: boolean = false;
  public col_xl_4: boolean = false;
  public col_sm_6: boolean = true;
  public col_xl_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;
  providers = [];
  places = [];
  cities = [];
  searchObject = {
    name: "",
    supplier_id: "",
    place_id: "",
    city_id: "",
  };
  openFilter() {
    if (this.show == true && this.sidebaron == true) {
      this.show = false;
      this.sidebaron = false;
    } else {
      this.show = true;
      this.sidebaron = true;
    }
  }

  gridOpen() {
    this.gridOptions = true;
    this.listView = false;
    this.col_xl_3 = true;

    this.xl_4 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = true;

    this.col_xl_2 = false;
    this.col_xl_12 = false;
  }

  listOpen() {
    this.gridOptions = false;
    this.listView = true;
    this.col_xl_3 = true;
    this.xl_4 = true;
    this.col_xl_12 = true;
    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;
    this.col_xl_6 = false;
    this.col_sm_6 = true;
  }

  grid2() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = true;
    this.col_sm_6 = true;

    this.col_xl_12 = false;
  }

  grid3() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = true;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }

  grid6() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }
  // open single product detail
  openProductDetail(content, product) {
    var imagesRect: Image[] = [];
    // product.images.forEach((element, index) => {
    imagesRect.push(
      new Image(0, { img: product.image }, { img: product.image })
    );
    // });
    product.imagesRect = imagesRect;
    this.modalService.open(content, { centered: true, size: "lg" });
    this.productDetail = product;
  }

  ngOnInit() {
    this.page = 0;
    this.getAllProviders();
    this.getProducts(this.page, this.limit);
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  getProducts(page, limit) {
    this.searchObject = {
      name: "",
      supplier_id: "",
      place_id: "",
      city_id: "",
    };

    this.helper
      .getProductPlaceList(page, limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = arr;
        this.showLoader = false;
      });
  }

  search() {
    this.helper
      .getProductPlaceList(0, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = arr;
        this.showLoader = false;
      });
  }

  reset() {
    this.searchObject = {
      name: "",
      supplier_id: "",
      place_id: "",
      city_id: "",
    };
    // if (this.userType == UserType.STORE) {
    //   this.searchObject.user_id = localStorage.getItem("admin_id");
    // }
    this.getProducts(0, this.limit);
  }

  loadMore() {
    this.showLoader = true;
    this.page = this.page + 1;
    this.helper
      .getProductPlaceList(this.page, this.limit, this.searchObject)
      .subscribe((x) => {
        let arr = x[appConstant.ITEMS] as any[];
        this.totalElements = x["pagination"]["totalElements"];
        this.products = [...this.products, ...arr];
        this.showLoader = false;
      });
  }

  deleteProduct(obj, index) {
    Swal.fire({
      title: "تحذير",
      text: "هل انت متأكد من حذف العنصر؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.value) {
        this.helper.deleteProductPlace(obj._id).subscribe((x) => {
          if (x[appConstant.STATUS]) {
            this.toastr.success(x[appConstant.MESSAGE]);
            this.page = 0;
            this.getProducts(this.page, this.limit);
          } else {
            this.toastr.error(x[appConstant.MESSAGE]);
          }
        });
      }
    });
  }

  addNew() {
    this.router.navigate(["/items/places/product/add"]);
  }

  changeSupplier(event) {
    console.log(event);
    let supplier = this.providers.find((x) => x._id == event);
    // let suplier_id = event;
    if (supplier) {
      this.searchObject.supplier_id = supplier._id;
      this.cities = supplier.cities;
    }
    // console.log(this.cities);
  }

  changeCity(event) {
    console.log(event);
    let city = this.cities.find((x) => x._id == event);
    // let suplier_id = event;
    if (city) {
      this.searchObject.city_id = city._id;
      this.helper.getAllPlaces(city._id).subscribe((x) => {
        this.places = x[appConstant.ITEMS] as any[];
      });
    }
    // console.log(this.cities);
  }
}
