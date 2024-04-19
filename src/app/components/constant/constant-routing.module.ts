import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { CityComponent } from "./city/city.component";
import { ComplaintsComponent } from "./complaints/complaints.component";
import { CountyComponent } from "./county/county.component";
import { AdvsComponent } from "./adv/adv.component";
import { ReasonsComponent } from "./reasons/reasons.component";
import { SocialMediaComponent } from "./social-media/social-media.component";
import { StaticPageComponent } from "./static-page/static-page.component";
import { CategoryComponent } from "./category/category.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "settings",
        component: GeneralSettingComponent,
        canActivate: [AdminGuard],
        data: {
          title: "الاعدادات العامة",
          breadcrumb: "الاعدادات العامة",
          roles: [appConstant.ADMIN_URL_ID.SETTINGS],
        },
      },
      {
        path: "social",
        component: SocialMediaComponent,
        canActivate: [AdminGuard],
        data: {
          title: "التواصل الاجتماعي",
          breadcrumb: "التواصل الاجتماعي",
          roles: [appConstant.ADMIN_URL_ID.CONTACT],
        },
      },
      {
        path: "static",
        component: StaticPageComponent,
        canActivate: [AdminGuard],
        data: {
          title: "الصحفات الثابتة",
          breadcrumb: "الصحفات الثابتة",
          roles: [appConstant.ADMIN_URL_ID.STATIC],
        },
      },
      {
        path: "complaints",
        component: ComplaintsComponent,
        canActivate: [AdminGuard],
        data: {
          title: "التواصل والشكاوي",
          breadcrumb: "التواصل والشكاوي",
          roles: [appConstant.ADMIN_URL_ID.COMPLAINS],
        },
      },
      {
        path: "welcome",
        component: WelcomeComponent,
        canActivate: [AdminGuard],
        data: {
          title: "الواجهات الترحيبية",
          breadcrumb: "الواجهات الترحيبية",
          roles: [appConstant.ADMIN_URL_ID.WELCOME],
        },
      },
      // {
      //   path: "advs",
      //   component: AdvsComponent,
      //   canActivate: [AdminGuard],
      //   data: {
      //     title: "سلايدر الاعلانات",
      //     breadcrumb: " سلايدر الاعلانات ",
      //     roles: [appConstant.ADMIN_URL_ID.ADVS],
      //   },
      // },
      {
        path: "category",
        component: CategoryComponent,
        canActivate: [AdminGuard],
        data: {
          title: " التصنيفات ",
          breadcrumb: " التصنيفات ",
          roles: [appConstant.ADMIN_URL_ID.CATEGORY],
        },
      },
      {
        path: "country",
        component: CountyComponent,
        canActivate: [AdminGuard],
        data: {
          title: "قائمة الدول",
          breadcrumb: "قائمة الدول",
          roles: [appConstant.ADMIN_URL_ID.COUNTRY],
        },
      },
      {
        path: "city",
        component: CityComponent,
        canActivate: [AdminGuard],
        data: {
          title: "قائمة المدن",
          breadcrumb: "قائمة المدن",
          roles: [appConstant.ADMIN_URL_ID.CITY],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstantRoutingModule {}
