import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FHTW Puzzle Game';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  logout(){
    this.http.post<{ message: string }>('http://localhost:3000/logout', localStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
       console.log(responseData.message);
      });
      localStorage.removeItem('ftoken');
  }

  tokenAuthenticator(){
    this.http.post<{ authenticated: boolean }>('http://localhost:3000/authenticator/', localStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
       
        if(responseData.authenticated == true) {
          sessionStorage.setItem('autcheck', "1");
        } else {
          sessionStorage.setItem('autcheck', "0");
        }
        this.handleButtons(); 
      });
  }


  ngOnInit(): void {
    var bild = document.createElement("img");

    bild.setAttribute("src", "assets/img/Logo.png");
    bild.setAttribute("id", "bildID");

    var img = document.getElementById("img");
    img.appendChild(bild);

    
    console.log("app page gewechselt");
    this.tokenAuthenticator(); 
  }

  handleButtons() {
    if(sessionStorage.getItem('autcheck') == "1") {
      document.getElementById('bsignup').style.visibility = 'hidden';
      document.getElementById('blogin').style.visibility = 'hidden';
      document.getElementById('blogout').style.visibility = 'visible';
      document.getElementById('bprofile').style.visibility = 'visible';
      document.getElementById('bhighscore').style.visibility = 'visible';
    } else {
      document.getElementById('bsignup').style.visibility = 'visible';
      document.getElementById('blogin').style.visibility = 'visible';
      document.getElementById('blogout').style.visibility = 'hidden';
      document.getElementById('bprofile').style.visibility = 'hidden';
      document.getElementById('bhighscore').style.visibility = 'hidden';
    }
    sessionStorage.removeItem('autcheck');
  }

}
