import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  async login(body: any) {
    // // console.log(body)
    // return new Promise((resolve, reject) => {
    //   this._http.post("http://localhost:3000/api/auth/login", body).subscribe(
    //     result => {
    //       // Handle result
    //       resolve(result);
    //     },
    //     error => {
    //       reject(error);
    //       console.log(error);
    //     },
    //     // () => {
    //     //   // 'onCompleted' callback.
    //     //   // No errors, route to new page here
    //     // }
    //   )
    // })

    return await this._http.post("http://localhost:3000/api/auth/login", body)

  }
}
