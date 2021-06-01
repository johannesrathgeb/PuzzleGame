import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient, public router: Router) { }
  

  tokenAuthenticator(){
    this.http.post<{ authenticated: boolean }>('http://localhost:3000/authenticator/', sessionStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
        if(responseData.authenticated == true){
          console.log("yalla, rein in die Highscore Bücher");
          this.router.navigate(['highscore']);
        }
      });
  }


  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.http.post<{ message: string, token: string }>('http://localhost:3000/login/', form.value, this.httpOptions )
      .subscribe((responseData) => {
        document.getElementById('msg').innerHTML = responseData.message;
        if(responseData.token != null){
          console.log(responseData.token);
          var tokenToJson = '{"ftoken":"' + responseData.token + '"}';
          console.log(tokenToJson);
          sessionStorage.setItem('ftoken', tokenToJson);
          this.tokenAuthenticator();
        }
      });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}