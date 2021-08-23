import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn : boolean = false
  adminName:any;


  constructor(private breakpointObserver: BreakpointObserver, public _router: Router){
    this.adminName = sessionStorage.getItem('admin_name');
    console.log(this.adminName);
    
    let user_id = sessionStorage.getItem('admin_id');
    let isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if( user_id != null &&  isLoggedIn != null ){
      this.isLoggedIn = true
      console.log('AUth FOund', user_id, isLoggedIn)
    }else{
      this.isLoggedIn = false
    }
     
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      
      shareReplay()
    );
  
  title = 'police-id-generation';
  
  logout(){
    sessionStorage.clear();
    this.isLoggedIn = false
    this._router.navigate(['login'])
  }

  auth(e){
    this.isLoggedIn = e
  }
}

