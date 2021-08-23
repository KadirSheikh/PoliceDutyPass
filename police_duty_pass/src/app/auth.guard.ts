import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {

        // firebase.auth().onAuthStateChanged((user) => {
        //   // console.log(user)
        //   if(user) {
        //     resolve(true);
        //   } else {

        //     this.router.navigate(['/login']);

        //     resolve(false);
        //   }
        // })

        let user_id = sessionStorage.getItem('admin_id');
        let isLoggedIn = sessionStorage.getItem('isLoggedIn')

        if(typeof user_id != undefined && typeof isLoggedIn != undefined )
          resolve(true);
        else{
            this.router.navigateByUrl('login');

            resolve(false);
        }

      })
  }
  
}
