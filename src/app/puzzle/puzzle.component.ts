import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor(private http: HttpClient) { }
  riddle = document.createElement("div");
  seconds = -1;
  irgndav = false; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };


  ngOnInit(): void {
    
    this.riddle.id = "riddle";

    var riddlecontainer = document.getElementById('riddlecontainer');
    riddlecontainer.appendChild(this.riddle);

    const puzzlePartsIdx = this.shufflePuzzleParts();
    this.timer(); 


    for (let i = 0; i < puzzlePartsIdx.length; i++) {
      const img = document.createElement("img");
      const imgId = "part" + puzzlePartsIdx[i];
      
      img.setAttribute("src", "assets/img/img" + puzzlePartsIdx[i] + ".jpg");
      img.setAttribute("alt", imgId);
      img.setAttribute("id", imgId);
      
      img.addEventListener("click", () => {
        const currentImgId = img.getAttribute("id")!;
        const imgElement = document.getElementById(currentImgId)!;
    
        if (!this.isSolved()) {
          if (this.isSelectable()) {
            
            const firstSelectedPuzzlePartId = this.getAlreadySelectedPicId();
    
            //set opacity for clicked element
            imgElement.style.opacity = "1.0";
            if (imgElement.style.opacity != "0.6") {
              imgElement.style.opacity = "0.6";
            }
    
            //swap parts, when more than 1 part is selected
            if (this.countSelected() > 1) {
              if (this.areNeighbours(firstSelectedPuzzlePartId, currentImgId)) {
                this.swapParts();
              }
              this.resetOpacity();
            }
          }
        }
      });
        
      this.riddle.appendChild(img);
    }
  }
  //Pfusch
  
  timer() {
          var timeText = document.createTextNode(" ");
          document.getElementById('time').appendChild(timeText);
           this.func1();
  }

  func1 = () => {
    
    this.seconds++; 
    console.log(this.seconds);
    console.log(this.seconds);
    var timeText = document.createTextNode(String(this.seconds));
    
    var x = document.getElementById('time');
    var url = window.location.href; 

    if(url == "http://localhost:4200/puzzle" && x.firstChild) {
      x.removeChild(x.firstChild);
      document.getElementById('time').appendChild(timeText);
    } 

    if(this.irgndav == false && url == "http://localhost:4200/puzzle") {
      setTimeout(this.func1,1000);
    } else {
      this.irgndav = false;
      this.addHighscore(); 
    }
    
 }

  shufflePuzzleParts() {
    const puzzleParts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = puzzleParts.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = puzzleParts[counter];
      puzzleParts[counter] = puzzleParts[index];
      puzzleParts[index] = temp;
    }
    return puzzleParts;
  }
  isSolved() {
    const pics = this.riddle.getElementsByTagName("img");
    
    //check if the parts are sorted
    for (let i = 0; i < pics.length; i++) {
      const pic = "part" + (i + 1).toString();
      const element = pics[i].getAttribute("id");
      
      if (pic != element) {
        return false;
      }
    }
    return true;
  }
  isSelectable() {
    return this.countSelected() <= 1;
  }
  countSelected() {
    const pics = this.riddle.getElementsByTagName("img");
    let counter = 0;
    
    // count selected elements
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        counter++;
      }
    }
    
    return counter;
  }
  getAlreadySelectedPicId() {
    const pics = this.riddle.getElementsByTagName("img");
    let counter = 0;
    
    // find selected element
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        return pics[i].getAttribute("id")!;
      }
    }
    
    return "";
  }
  areNeighbours(firstPicId: string, secondPicId: string) {
    const pics = this.riddle.getElementsByTagName("img");
    
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].getAttribute("id") == firstPicId) {
        const neighbourIdxs = this.getNeighbourIdxs(i);
        for (let j = 0; j < neighbourIdxs.length; j++) {
          if (pics[neighbourIdxs[j]].getAttribute("id") == secondPicId) {
            return true;
          }
        }
      }
    }
    return false;
  }
  getNeighbourIdxs(currentIdx: number) {
    const returnIdxs: number[] = [];
  
    // upperNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx - 3)) {
      returnIdxs.push(currentIdx - 3);
    }
    // rightNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx + 1)) {
      returnIdxs.push(currentIdx + 1);
    }
    // lowerNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx + 3)) {
      returnIdxs.push(currentIdx + 3);
    }
    // leftNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx - 1)) {
      returnIdxs.push(currentIdx - 1);
    }
    
    return returnIdxs;
  }
  isNeighbourIndexRow(currentIdx: number, checkIdx: number) {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9) &&
      (Math.floor(currentIdx / 3) == Math.floor(checkIdx / 3));
  }
  isNeighbourIndexCol(checkIdx: number) {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9);
  }
  swapParts() {
    const pics = this.riddle.getElementsByTagName("img");
    let pic1 = null;
    
    // loop through parts
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        if (pic1 == null) {
          pic1 = document.getElementById(pics[i].getAttribute("id")!);
          continue;
        }
        
        let pic2 = document.getElementById(pics[i].getAttribute("id")!)!;
        
        //swap pictures (swap their properties)
        const pic1Source = pic1.getAttribute("src")!;
        const pic1Alt = pic1.getAttribute("alt")!;
        const pic1Id = pic1.getAttribute("id")!;
  
        const pic2Source = pic2.getAttribute("src")!;
        const pic2Alt = pic2.getAttribute("alt")!;
        const pic2Id = pic2.getAttribute("id")!;
   
        pic1.setAttribute("src", pic2Source);
        pic1.setAttribute("alt", pic2Alt);
        pic1.setAttribute("id", pic2Id);
  
        pic2.setAttribute("src", pic1Source);
        pic2.setAttribute("alt", pic1Alt);
        pic2.setAttribute("id", pic1Id);
        
        if (this.isSolved()) {
          let solved = document.createElement("div");
          solved.id = "solved";
          
          const linkText = document.createTextNode("SOLVED :)");
          this.irgndav = true; 

          solved.appendChild(linkText);
          this.riddle.appendChild(solved); 
        }
        
        break;
      }
    }
  }
  resetOpacity() {
    const pics = this.riddle.getElementsByTagName("img");
  
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        pics[i].style.opacity = "1.0";
      }
    }
  }

  addHighscore(){
    console.log("function called");
    var edittoken = localStorage.getItem('ftoken')

    if(localStorage.getItem('ftoken') != null) {
      edittoken = edittoken.substring(0, edittoken.length - 1);
      edittoken = edittoken + ',"zeit":"' + this.seconds + '"}';
      console.log("------");
      console.log(edittoken);
    } else {
      console.log("Einloggen um Highscore zu speichern");
      var plslogintext = document.createTextNode("Einloggen um Highscore zu speichern!")
      let plsloginelement = document.createElement("div");
      plsloginelement.id = "solved";
      plsloginelement.appendChild(plslogintext);
      this.riddle.appendChild(plsloginelement);
    }

    console.log(edittoken);
    this.http.post<{ message: string }>('http://localhost:3000/highscore', edittoken, this.httpOptions)
      .subscribe((responseData) => {
       console.log(responseData.message);
      });
  }

}






