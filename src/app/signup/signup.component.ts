import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NgForm, Validators } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password1 = new FormControl('', [Validators.required]);;
  password2 = new FormControl('', [Validators.required]);;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
     
    console.log(sessionStorage.getItem('ftoken'));
    if(form.value.password != form.value.repeatpassword){
      console.log("Passwörter stimmen nicht überein!");
    }
    else{
      this.http.post<{ message: string }>('http://localhost:3000/signup', form.value, this.httpOptions)
      .subscribe((responseData) => {
       document.getElementById('msg').innerHTML = responseData.message;
      });
      console.log("SignUp successfull!");
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    else if( this.email.hasError('email')){
      return 'Invalid';
    }
  }
}