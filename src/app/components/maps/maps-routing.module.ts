import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "../../service/appConstant";
import { OrderMapComponent } from "./order-map/order-map.component";
import { UncovarateMapComponent } from "./uncovarate-map/uncovarate-map.component";
import { AdminGuard } from "../../shared/guard/admin.guard";
import { DriversMapComponent } from "./drivers-map/drivers-map.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "order_maps",
        component: OrderMapComponent,
        canActivate: [AdminGuard],
        data: {
          title: "التوزيع الجغرافي للطلبات",
          breadcrumb: "التوزيع الجغرافي للطلبات",
          roles: [appConstant.ADMIN_URL_ID.ORDERSMAP],
        },
      },
      {
        path: "driver_map",
        component: DriversMapComponent,
        canActivate: [AdminGuard],
        data: {
          title: "التوزيع الجغرافي للسائقين",
          breadcrumb: "التوزيع الجغرافي للسائقين",
          roles: [appConstant.ADMIN_URL_ID.EMPLOYEE],
        },
      },
      {
        path: "unconvarage_map",
        component: UncovarateMapComponent,
        canActivate: [AdminGuard],
        data: {
          title: "المناطق الغير مغطاة",
          breadcrumb: "المناطق الغير مغطاة",
          roles: [appConstant.ADMIN_URL_ID.UNCOVERAGEMAP],
        },
      },
 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
