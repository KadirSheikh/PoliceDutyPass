import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() auth = new EventEmitter<boolean>();
  loginForm: FormGroup;
  error: String = '';
  message: String = '';
  response: any;
  isLoggedIn : boolean = false
  constructor(private formBuilder: FormBuilder, private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  get f() { return this.loginForm.controls; }
  public onSubmit() {
    
    this._auth.login(this.loginForm.value).then(res => {
      res.subscribe(response => {
        this.response = response
        // console.log(this.response)
        if (!this.response.status) {
          this.error = this.response.message;
          this.message = '';
        }

        else {
          this.auth.emit(true)
          this._router.navigate(['dashboard'])
          console.log(this.response.data)
          sessionStorage.setItem('admin_id', (this.response.data.id).toString())
          sessionStorage.setItem('admin_name', (this.response.data.name).toString())
          sessionStorage.setItem('isLoggedIn', 'true')

          this.message = "Login Successfull"
          this.error = ''
        }
        

      },
        error => { console.log(error); throw error }
      )
    })
  }
}
