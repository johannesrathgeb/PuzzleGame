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
    this.http.post<{ message: string }>('http://localhost:3000/logout', sessionStorage.getItem('ftoken'), this.httpOptions)
      .subscribe((responseData) => {
       console.log(responseData.message);
      });
      sessionStorage.removeItem('ftoken');
  }

}
