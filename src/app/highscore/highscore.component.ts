import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.http.post<{ authenticated: boolean }>('http://localhost:3000/authenticator/', sessionStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
        if(responseData.authenticated == false){
          console.log("yalla, raus in die Highscore Bücher");
          this.router.navigate(['login']);
        }
      });
  }

  addHighscore(){
    console.log("function called");
    this.http.post<{ message: string }>('http://localhost:3000/highscore', sessionStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
       console.log(responseData.message);
      });
  }

  getHighscore(){
    console.log("function called");
    this.http.get<{highscore, username}>('http://localhost:3000/highscore', this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.highscore);
        document.getElementById('msg').innerHTML = "Username: " + responseData.username + " Highscore: " + responseData.highscore;
      });
  }
}



//Stringify: JS Object-> JSON String
//Parse: JSON String-> JS Object