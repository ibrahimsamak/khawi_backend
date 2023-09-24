import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { ProjectComponent } from "../dashboard/project/project.component";
import { CommentsComponent } from "./comments/comments.component";
import { EarningComponent } from "./earning/earning.component";
import { OrdersComponent } from "./orders/orders.component";
import { NewOrderComponent } from "./new-order/new-order.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "add",
        component: NewOrderComponent,
        canActivate: [AdminGuard],
        data: {
          title: "أضافة طلب",
          breadcrumb: "الطلبات",
          roles: [appConstant.ADMIN_URL_ID.ORDERS],
        },
      },
      {
        path: "orders",
        component: OrdersComponent,
        canActivate: [AdminGuard],
        data: {
          title: "الطلبات والعائدات",
          breadcrumb: "الطلبات",
          roles: [appConstant.ADMIN_URL_ID.ORDERS],
        },
      },
      {
        path: "earning",
        component: EarningComponent,
        canActivate: [AdminGuard],
        data: {
          title: "الطلبات والعائدات",
          breadcrumb: "العائدات المالية",
          roles: [appConstant.ADMIN_URL_ID.ORDEREARNING],
        },
      },
      {
        path: "comments",
        component: CommentsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "التعليقات",
          breadcrumb: "التعليقات",
          roles: [appConstant.ADMIN_URL_ID.USERRATE],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
