import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { appConstant, UserType } from "src/app/service/appConstant";

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen = false;

  constructor() {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    // {
    //   path: "/dashboard/default",
    //   title: "الرئيسية",
    //   icon: "home",
    //   type: "link",
    //   //   badgeType: "primary",
    //   //   badgeValue: "new",
    //   active: true,
    // },
    // {
    //   title: "الثوابت",
    //   icon: "slack",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/constant/settings", title: "الاعدادات العامة", type: "link" },
    //     { path: "/constant/social", title: "التواصل الاجتماعي", type: "link" },
    //     { path: "/constant/static", title: "الصحفات الثابتة", type: "link" },
    //     {
    //       path: "/constant/complaints",
    //       title: "التواصل والشكاوي",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/welcome",
    //       title: "الواجهات الترحيبية",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/advs",
    //       title: "سلايدر الاعلانات",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/category",
    //       title: "التصنيفات",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/country",
    //       title: "قائمة الدول",
    //       type: "link",
    //     },
    //     {
    //       path: "/constant/city",
    //       title: "قائمة المدن",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "المستخدمين والعملاء",
    //   icon: "users",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/users/admins",
    //       title: "الادارة",
    //       type: "link",
    //     },
    //     { path: "/users/clients", title: "العملاء", type: "link" },
    //     {
    //       path: "/users/designers",
    //       title: "المصممين والمتاجر",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "المشاريع والمنتجات",
    //   icon: "list",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/items/products", title: "المنتجات", type: "link" },
    //     { path: "/items/projects", title: "المشاريع", type: "link" },
    //   ],
    // },
    // {
    //   title: "الطلبات والعائدات",
    //   icon: "dollar-sign",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/orders/orders", title: "الطلبات", type: "link" },
    //     { path: "/orders/earning", title: "العائدات المالية", type: "link" },
    //     { path: "/orders/comments", title: "التعليقات", type: "link" },
    //   ],
    // },
    // {
    //   title: "الرسائل والاشعارات",
    //   icon: "message-square",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/mass/notifications", title: "التنبيهات", type: "link" },
    //     { path: "/mass/add", title: "اضافة تنبيه", type: "link" },
    //   ],
    // },
  ];
  // items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

  getMenu() {
    var userRoles: any[] = JSON.parse(localStorage.getItem("roles"));
    var userType = localStorage.getItem("type");
    var admin_id = localStorage.getItem("admin_id");

    this.MENUITEMS = [];

    let constant = {
      title: "الثوابت والاعدادات",
      icon: "slack",
      type: "sub",
      active: false,
      children: [],
    };

    let users = {
      title: "مستخدمين النظام",
      icon: "users",
      type: "sub",
      active: false,
      children: [],
    };

    let items = {
      title: "المنتجات والمناطق",
      icon: "list",
      type: "sub",
      active: false,
      children: [],
    };

    let orders = {
      title: "الطلبات والعائدات",
      icon: "dollar-sign",
      type: "sub",
      active: false,
      children: [],
    };

    let maps = {
      title: "الخرائط",
      icon: "map",
      type: "sub",
      active: false,
      children: [],
    };

    let notification = {
      title: "الرسائل والاشعارات",
      icon: "message-square",
      type: "sub",
      active: false,
      children: [],
    };

    let offers = {
      title: "العروض والتخفيضات",
      icon: "percent",
      type: "sub",
      active: false,
      children: [],
    };

    if (userType == UserType.ADMIN) {
      userRoles.sort((val1, val2) => {
        return Number(val1.sort) - Number(val2.sort);
      });

      userRoles.forEach((element) => {
        if (element.name == appConstant.ADMIN_URL_ID.DASHBOARD) {
          let obj = {
            path: "/dashboard/default",
            title: "الرئيسية",
            icon: "home",
            type: "link",
            //   badgeType: "primary",
            //   badgeValue: "new",
            active: true,
          };
          this.MENUITEMS.push(obj);
        }
        if (
          element.name == appConstant.ADMIN_URL_ID.SETTINGS ||
          element.name == appConstant.ADMIN_URL_ID.WELCOME ||
          element.name == appConstant.ADMIN_URL_ID.COMPLAINS ||
          element.name == appConstant.ADMIN_URL_ID.CONTACT ||
          element.name == appConstant.ADMIN_URL_ID.COUNTRY ||
          element.name == appConstant.ADMIN_URL_ID.CITY ||
          element.name == appConstant.ADMIN_URL_ID.PLACES ||
          element.name == appConstant.ADMIN_URL_ID.STATIC ||
          element.name == appConstant.ADMIN_URL_ID.CATEGORY
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.SETTINGS) {
            let obj = {
              path: "/constant/settings",
              title: "الاعدادات العامة",
              type: "link",
            };
            constant.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.CONTACT) {
            let obj = {
              path: "/constant/social",
              title: "التواصل الاجتماعي",
              type: "link",
            };

            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.STATIC) {
            let obj = {
              path: "/constant/static",
              title: "الصحفات الثابتة",
              type: "link",
            };

            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.COMPLAINS) {
            let obj = {
              path: "/constant/complaints",
              title: "التواصل والشكاوي",
              type: "link",
            };
            constant.children.push(obj);
          }
          if (element.name == appConstant.ADMIN_URL_ID.WELCOME) {
            let obj = {
              path: "/constant/welcome",
              title: "الواجهات الترحيبية",
              type: "link",
            };
            constant.children.push(obj);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.COUNTRY) {
          //   let obj = {
          //     path: "/constant/country",
          //     title: "قائمة الدول",
          //     type: "link",
          //   };
          //   constant.children.push(obj);
          // }
          // if (element.name == appConstant.ADMIN_URL_ID.CITY) {
          //   let obj = {
          //     path: "/constant/city",
          //     title: "قائمة المدن",
          //     type: "link",
          //   };
          //   constant.children.push(obj);
          // }

          // if (element.name == appConstant.ADMIN_URL_ID.CATEGORY) {
          //   let obj = {
          //     path: "/constant/category",
          //     title: "التصنيفات",
          //     type: "link",
          //   };

          //   constant.children.push(obj);
          // }
        }

        if (
          element.name == appConstant.ADMIN_URL_ID.USER ||
          element.name == appConstant.ADMIN_URL_ID.STORES ||
          element.name == appConstant.ADMIN_URL_ID.EMPLOYEE ||
          element.name == appConstant.ADMIN_URL_ID.ADMINS
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.ADMINS) {
            let obj = {
              path: "/users/admins",
              title: "الادارة",
              type: "link",
            };
            users.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.USER) {
            let obj = {
              path: "/users/clients",
              title: "العملاء",
              type: "link",
            };
            users.children.push(obj);
          }
          // if (element.name == appConstant.ADMIN_URL_ID.STORES) {
          //   let obj = {
          //     path: "/users/designers",
          //     title: "مزودين الخدمات",
          //     type: "link",
          //   };
          //   users.children.push(obj);
          // }

          // if (element.name == appConstant.ADMIN_URL_ID.EMPLOYEE) {
          //   let obj = {
          //     path: "/users/employee",
          //     title: "السائقين",
          //     type: "link",
          //   };
          //   users.children.push(obj);
          // }
        }

        // if (
        //   element.name == appConstant.ADMIN_URL_ID.PRODUCTS ||
        //   element.name == appConstant.ADMIN_URL_ID.PLACES ||
        //   element.name == appConstant.ADMIN_URL_ID.PRODUCTS_PLACES ||
        //   element.name == appConstant.ADMIN_URL_ID.STORE_PLACES
        // ) {
        //   if (element.name == appConstant.ADMIN_URL_ID.PRODUCTS) {
        //     let obj = {
        //       path: "/items/products",
        //       title: "المنتجات",
        //       type: "link",
        //     };
        //     items.children.push(obj);
        //   }
        //   if (element.name == appConstant.ADMIN_URL_ID.STORE_PLACES) {
        //     let obj = {
        //       path: "/items/places/store",
        //       title: "مزودين المربعات",
        //       type: "link",
        //     };
        //     items.children.push(obj);
        //   }

        //   if (element.name == appConstant.ADMIN_URL_ID.PRODUCTS_PLACES) {
        //     let obj = {
        //       path: "/items/places/product",
        //       title: "منتجات المربعات",
        //       type: "link",
        //     };
        //     items.children.push(obj);
        //   }

        //   if (element.name == appConstant.ADMIN_URL_ID.PLACES) {
        //     let obj = {
        //       path: "/items/places",
        //       title: "مناطق ومربعات التوزيع",
        //       type: "link",
        //     };
        //     items.children.push(obj);
        //   }
        // }

        if (
          element.name == appConstant.ADMIN_URL_ID.ORDERS ||
          element.name == appConstant.ADMIN_URL_ID.ORDEREARNING ||
          element.name == appConstant.ADMIN_URL_ID.USERRATE
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.ORDERS) {
            // let obj = {
            //   path: "/orders/add",
            //   title: "اضافة طلب",
            //   type: "link",
            // };
            // orders.children.push(obj);

            let obj2 = {
              path: "/orders/orders",
              title: "الطلبات",
              type: "link",
            };
            orders.children.push(obj2);
          }

          if (element.name == appConstant.ADMIN_URL_ID.ORDEREARNING) {
            let obj = {
              path: "/orders/earning",
              title: "العائدات المالية",
              type: "link",
            };
            orders.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.USERRATE) {
            let obj = {
              path: "/orders/comments",
              title: "التعليقات",
              type: "link",
            };
            orders.children.push(obj);
          }
        }

        if (
          element.name == appConstant.ADMIN_URL_ID.ORDERSMAP ||
          element.name == appConstant.ADMIN_URL_ID.UNCOVERAGEMAP ||
          element.name == appConstant.ADMIN_URL_ID.EMPLOYEE
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.ORDERSMAP) {
            let obj = {
              path: "/maps/order_maps",
              title: "التوزيع الجغرافي للطلبات",
              type: "link",
            };
            maps.children.push(obj);
          }
          // if (element.name == appConstant.ADMIN_URL_ID.EMPLOYEE) {
          //   let obj = {
          //     path: "/maps/driver_map",
          //     title: "التوزيع الجغرافي للمستخدمين",
          //     type: "link",
          //   };
          //   maps.children.push(obj);
          // }
    
          // if (element.name == appConstant.ADMIN_URL_ID.UNCOVERAGEMAP) {
          //   let obj = {
          //     path: "/maps/unconvarage_map",
          //     title: "المناطق الغير مغطاة",
          //     type: "link",
          //   };
          //   maps.children.push(obj);
          // }
        }

        if (
          element.name == appConstant.ADMIN_URL_ID.COUPON ||
          element.name == appConstant.ADMIN_URL_ID.ADVS
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.COUPON) {
            let obj = {
              path: "/offers/coupon",
              title: "الكوبونات",
              type: "link",
            };

            offers.children.push(obj);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.ADVS) {
          //   let obj2 = {
          //     path: "/constant/advs",
          //     title: "سلايدر الاعلانات",
          //     type: "link",
          //   };
          //   offers.children.push(obj2);
          // }
        }

        if (
          element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD ||
          element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS
        ) {
          if (element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD) {
            let obj = {
              path: "/mass/add",
              title: "اضافة تنبيه",
              type: "link",
            };

            notification.children.push(obj);
          }

          if (element.name == appConstant.ADMIN_URL_ID.NOTIFICATIONS) {
            let obj = {
              path: "/mass/notifications",
              title: "التنبيهات",
              type: "link",
            };
            notification.children.push(obj);
          }

          // if (element.name == appConstant.ADMIN_URL_ID.MYMESSAGES) {
          //   let obj = {
          //     path: "/mass/messages",
          //     title: "الرسائل الواردة",
          //     type: "link",
          //   };
          //   notification.children.push(obj);
          // }
        }
      });

      if (constant.children.length > 0) this.MENUITEMS.push(constant);
      if (users.children.length > 0) this.MENUITEMS.push(users);
      if (items.children.length > 0) this.MENUITEMS.push(items);
      if (orders.children.length > 0) this.MENUITEMS.push(orders);
      if (maps.children.length > 0) this.MENUITEMS.push(maps);
      if (offers.children.length > 0) this.MENUITEMS.push(offers);
      if (notification.children.length > 0) this.MENUITEMS.push(notification);
      return this.MENUITEMS;
    }
    // if (
    //   userType == UserType.DESIGNER ||
    //   userType == UserType.IMPLEMENTER ||
    //   userType == UserType.STORE
    // ) {
    //   let obj = {
    //     path: "/dashboard/default",
    //     title: "الرئيسية",
    //     icon: "home",
    //     type: "link",
    //     active: true,
    //   };
    //   this.MENUITEMS.push(obj);

    //   let obj2 = {
    //     path: "/users/designers/details/" + admin_id,
    //     title: "الملف الشخصي",
    //     icon: "user",
    //     type: "link",
    //     active: true,
    //   };
    //   this.MENUITEMS.push(obj2);

    //   if (userType == UserType.DESIGNER || userType == UserType.IMPLEMENTER) {
    //     let obj3 = {
    //       path: "/items/projects",
    //       title: "المشاريع",
    //       icon: "slack",
    //       type: "link",
    //       active: true,
    //     };
    //     this.MENUITEMS.push(obj3);
    //   }

    //   if (userType == UserType.STORE) {
    //     let obj3 = {
    //       path: "/items/products",
    //       title: "المنتجات",
    //       icon: "slack",
    //       type: "link",
    //       active: true,
    //     };
    //     this.MENUITEMS.push(obj3);
    //   }
    //   let obj4 = {
    //     path: "/orders/orders",
    //     title: "الطلبات",
    //     type: "link",
    //   };
    //   orders.children.push(obj4);

    //   let obj5 = {
    //     path: "/orders/earning",
    //     title: "العائدات المالية",
    //     type: "link",
    //   };
    //   orders.children.push(obj5);

    //   let obj6 = {
    //     path: "/orders/comments",
    //     title: "التعليقات",
    //     type: "link",
    //   };
    //   orders.children.push(obj6);

    //   let obj7 = {
    //     path: "/mass/notifications",
    //     title: "التنبيهات",
    //     type: "link",
    //   };
    //   notification.children.push(obj7);

    //   let obj8 = {
    //     path: "/mass/messages",
    //     title: "الرسائل الواردة",
    //     type: "link",
    //   };
    //   notification.children.push(obj8);

    //   if (userType == UserType.IMPLEMENTER || userType == UserType.DESIGNER) {
    //     let obj9 = {
    //       path: "/chat",
    //       title: "المحادثات الفورية",
    //       type: "link",
    //     };
    //     notification.children.push(obj9);
    //   }

    //   if (orders.children.length > 0) this.MENUITEMS.push(orders);
    //   if (notification.children.length > 0) this.MENUITEMS.push(notification);

    //   return this.MENUITEMS;
    // }
  }
  Array;
  items = new BehaviorSubject<Menu[]>(this.getMenu());
}
