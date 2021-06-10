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
    this.http.post<{ authenticated: boolean }>('http://localhost:3000/authenticator/', localStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
        if(responseData.authenticated == false){
          console.log("yalla, raus in die Highscore Bücher");
          this.router.navigate(['login']);
        } else {
          this.getAllHighscores();
        }

      });
  }

/*
  addHighscore(){
    console.log("function called");
    this.http.post<{ message: string }>('http://localhost:3000/highscore', localStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
       console.log(responseData.message);
      });
  }
  */

  getAllHighscores(){

    if(localStorage.getItem("ftoken") != null) {
      var edittoken = localStorage.getItem("ftoken");
      var cuttoken = edittoken.substring(11);
      var cuttoken2 = cuttoken.substring(0, cuttoken.length - 1);
      var cuttoken2 = cuttoken.substring(0, cuttoken2.length - 1);
    }

    console.log("function called");
    this.http.get<{db: Array<any>}>('http://localhost:3000/allhighscores?token=' + cuttoken2, this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.db);
        
        if(responseData.db != null) {
          var x = document.getElementById('msg');
          while(x.firstChild) {
            x.removeChild(x.firstChild);
          }  
          var dbdata = responseData.db; 
          dbdata.sort((a, b) => (a.highscore > b.highscore) ? -1 : 1);

          for(let i = 0; i < 10; i++) {
            var newDiv = document.createElement("div");
            var newP = document.createElement("p");
            var obj = dbdata[i];
            var newText = document.createTextNode(i + 1 + ". Username: " + obj.email + " Highscore: " + obj.highscore);
            newP.appendChild(newText);
            newDiv.appendChild(newP);
            document.getElementById('msg').appendChild(newDiv); 
          }

        }
        /*
        var x = document.getElementById('msg');
        if(x.firstChild) {
          x.removeChild(x.firstChild);
        }   
        var newDiv = document.createElement("div");
        var newText = document.createTextNode("Username: " + responseData.username + " Highscore: " + responseData.highscore);

        newDiv.appendChild(newText);
        document.getElementById('msg').appendChild(newDiv); 
        */
      });
  }
}



//Stringify: JS Object-> JSON String
//Parse: JSON String-> JS Object