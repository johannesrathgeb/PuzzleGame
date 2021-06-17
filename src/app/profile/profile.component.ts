import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.http.post<{ authenticated: boolean }>('http://localhost:3000/authenticator/', localStorage.getItem('ftoken'), this.httpOptions)
    .subscribe((responseData) => {
      if(responseData.authenticated == false){
        console.log("yalla, raus in die Highscore Bücher");
        this.router.navigate(['login']);
      } else {
        this.getHighscore();
      }
    });
  
  }

  getHighscore(){
    console.log(localStorage.getItem("ftoken"));

    if(localStorage.getItem("ftoken") != null) {
      var edittoken = localStorage.getItem("ftoken");
      console.log(edittoken);
      var cuttoken = edittoken.substring(11);
      console.log(cuttoken);
      var cuttoken2 = cuttoken.substring(0, cuttoken.length - 1);
      var cuttoken2 = cuttoken.substring(0, cuttoken2.length - 1);
      console.log(cuttoken2);
    }

    this.http.get<{highscore, username}>('http://localhost:3000/highscore?token=' + cuttoken2, this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.highscore);
        //document.getElementById('msg').innerHTML = "Username: " + responseData.username + " Highscore: " + responseData.highscore;
        
        var x = document.getElementById('msg');
        if(x.firstChild) {
          x.removeChild(x.firstChild);
        }   
        var newDiv = document.createElement("div");
        var newText = document.createTextNode("Username: " + responseData.username + " Highscore: " + responseData.highscore);

        newDiv.appendChild(newText);
        document.getElementById('msg').appendChild(newDiv); 
      });
  }

}
