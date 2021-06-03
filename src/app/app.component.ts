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
    console.log("app page gewechselt");
    this.tokenAuthenticator(); 
  }

  handleButtons() {
    if(sessionStorage.getItem('autcheck') == "1") {
      document.getElementById('bsignup').style.visibility = 'hidden';
    } else {
      document.getElementById('bsignup').style.visibility = 'visible';
    }
    sessionStorage.removeItem('autcheck');
  }

}
