import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { ProjectComponent } from "../dashboard/project/project.component";
import { ProductsAddComponent } from "./products-add/products-add.component";
import { PlacesComponent } from "./places/places.component";
import { PlacesAddComponent } from "./places-add/places-add.component";
import { StoreProductsComponent } from "./store-products/store-products.component";
import { PlacesProductComponent } from "./places-product/places-product.component";
import { PlacesProductAddComponent } from "./places-product-add/places-product-add.component";
import { StorePlaceAddComponent } from "./store-place-add/store-place-add.component";
import { StorePlaceComponent } from "./store-place/store-place.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "products",
        component: StoreProductsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "المناطق والمنتجات",
          breadcrumb: "المنتجات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS],
        },
      },
      {
        path: "add",
        component: ProductsAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "المناطق والمنتجات",
          breadcrumb: "المنتجات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS],
        },
      },
      {
        path: "add/:id",
        component: ProductsAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "المناطق والمنتجات",
          breadcrumb: "المنتجات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS],
        },
      },
      {
        path: "places",
        component: PlacesComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مناظق ومربعات التوزيع",
          breadcrumb: "مناظق ومربعات التوزيع",
          roles: [appConstant.ADMIN_URL_ID.PLACES],
        },
      },
      {
        path: "places/add",
        component: PlacesAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مناظق ومربعات التوزيع",
          breadcrumb: "مناظق ومربعات التوزيع",
          roles: [appConstant.ADMIN_URL_ID.PLACES],
        },
      },
      {
        path: "places/add/:id",
        component: PlacesAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مناظق ومربعات التوزيع",
          breadcrumb: "مناظق ومربعات التوزيع",
          roles: [appConstant.ADMIN_URL_ID.PLACES],
        },
      },
      {
        path: "places/product",
        component: PlacesProductComponent,
        canActivate: [AdminGuard],
        data: {
          title: "منتجات المربعات",
          breadcrumb: "منتجات المربعات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS_PLACES],
        },
      },
      {
        path: "places/product/add",
        component: PlacesProductAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "منتجات المربعات",
          breadcrumb: "منتجات المربعات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS_PLACES],
        },
      },
      {
        path: "places/product/add/:id",
        component: PlacesProductAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "منتجات المربعات",
          breadcrumb: "منتجات المربعات",
          roles: [appConstant.ADMIN_URL_ID.PRODUCTS_PLACES],
        },
      },
      {
        path: "places/store/add/:id",
        component: StorePlaceAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مزودين المربعات",
          breadcrumb: "مزودين المربعات",
          roles: [appConstant.ADMIN_URL_ID.STORE_PLACES],
        },
      },
      {
        path: "places/store/add",
        component: StorePlaceAddComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مزودين المربعات",
          breadcrumb: "مزودين المربعات",
          roles: [appConstant.ADMIN_URL_ID.STORE_PLACES],
        },
      },
      {
        path: "places/store",
        component: StorePlaceComponent,
        canActivate: [AdminGuard],
        data: {
          title: "مزودين المربعات",
          breadcrumb: "مزودين المربعات",
          roles: [appConstant.ADMIN_URL_ID.STORE_PLACES],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductProjectRoutingModule {}
