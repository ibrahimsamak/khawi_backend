import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: any[] = JSON.parse(localStorage.getItem("roles"));
    var arr = [];
    userRoles.forEach((element) => {
      arr.push(element.name);
    });
    allowedRoles.forEach((element) => {
      if (arr.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("admin_id") != null) {
      let roles = next.data["roles"] as Array<String>;
      let expire = localStorage.getItem("expire");
      if (expire && new Date(expire) >= new Date()) {
        if (roles) {
          var match = this.roleMatch(roles);
          if (match) {
            return true;
          } else {
            this.router.navigate(["/error/403"]);
            return false;
          }
        } else {
          return true;
        }
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
