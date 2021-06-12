const express = require('express');
const { ModuleKind } = require('typescript');
const cors = require('cors');
const { ReturnStatement } = require('@angular/compiler');
const app = express();

//enable all CORS request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

var db = [  
    {email: 'test@test.gg',password: '11111111',repeatpassword: '111111111',btoken: ' ',highscore: '10'},
    {email: 'webfr@superfach.at',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '39'},
    {email: 'cheater@superscore.at',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '80'},
    {email: 'user1@user1.com',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '0'},
    {email: 'heidissche@obaihuckdoundmochweb.at',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '29'},
    {email: 'berchdsgodnabier@gmail.com',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '36'},
    {email: 'aram@bestgamemode.at',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '45'},
    {email: 'removeyuumi@markyetter.at',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '87'},
    {email: 'summersplash@hinigsbett.it',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '13'},
    {email: 'uweuweosas@saugmeinboden.de',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '69'},
    {email: 'legalizesibis@inaustria.de',password: '11111111',repeatpassword: '11111111',btoken: ' ',highscore: '69'}
];
var btoken = "";
//var currentBtoken ="";

//SIMPLE GET
app.get('/', (req, res, next) => {
    res.send('hello world');  
});
//Highscore GET
app.get('/highscore', (req, res, next) =>{
    
    ftoken = req.query.token

    let returnHighscore;
    let returnUsername;
    for(let i = 0; i < db.length; i++){
        dbData = db[i];
        btoken = dbData.btoken;

        if(btoken == ftoken){
            userFound = true;
            returnHighscore = dbData.highscore;
            returnUsername = dbData.email;
        }
    }

    res.status(200).json({
        highscore: returnHighscore,
        username: returnUsername
    });
    
    //Werte abrufen
});

app.get('/allhighscores', (req, res, next) =>{
    
    ftoken = req.query.token

    for(let i = 0; i < db.length; i++){
        dbData = db[i];
        btoken = dbData.btoken;

        if(btoken == ftoken){
            userFound = true;
        }
    }

    res.status(200).json({
        db: db
    });
    
    //Werte abrufen
});


//login post
app.post('/login', (req, res, next) => {
    const loginData = req.body;
    let loginUser = false;
    let userExists = false;
    
    let dbData = [];
    for(var i = 0; i < db.length; i++){
        dbData = db[i];
        if(loginData.email === dbData.email){
            //console.log("existed");
            userExists = true;
            if(loginData.password === dbData.password){
                loginUser=true;


                var crypto = require("crypto");
                btoken = crypto.randomBytes(20).toString('hex');
                dbData.btoken = btoken;
                db[i] = dbData;
                //console.log(db[i]);
            }
        }
    }

    if(loginUser == true){
       //currentBtoken = btoken;
        res.status(200).json({
            message: 'Login erfolgreich',
            
            token: btoken
        });
    }
    else {
        if(userExists == true){
            res.status(200).json({
                message: 'Falsches Passwort'
            });
        }
        else{
            res.status(200).json({
                message: 'Dieser User existiert nicht'
            });
        }
    }
});

//signup post
app.post('/signup', (req, res, next) => {
    const signupData = req.body;
   

    let exists = false;

    
    let dbData = [];
    for(var i = 0; i < db.length; i++){
       
        dbData = db[i];
       

        if(signupData.email=== dbData.email){
            //console.log("existed");
            exists = true;
        }
    }
    

    if(exists == true){
        res.status(200).json({
            message: 'Schon vorhanden'
        });
    }
    else{

        signupData["btoken"] = " ";
        signupData["highscore"] = "0";
        db.push(signupData);
        console.log(db);
        res.status(200).json({
            message: 'Neuer User erstellt'
        });
    }
});

//Authenticator
app.post('/authenticator', (req, res, next) => {
    let ftoken = req.body.ftoken;

    if(ftoken == null) {
        res.status(200).json({
            authenticated: false
        });
        return; 
    }

    let confirmToken = false;
    for(let i = 0; i < db.length; i++){
        dbData = db[i];
        if(dbData.btoken == ftoken){
            confirmToken = true;
        }
    }
        if(confirmToken == true){
            res.status(200).json({
                authenticated: true
            });
        }
        else{
            res.status(200).json({
                authenticated: false
            });
        }
});

app.post('/highscore', (req, res, next) =>{
    console.log("travel");

    let ftoken = req.body.ftoken;

    if(ftoken == null) {
        res.status(200).json({
           message: 'Einloggen um Highscore zu speichern'
        });
        return; 
    }

    let zeit = req.body.zeit; 
    let userFound = false;
    for(let i = 0; i < db.length; i++){
        dbData = db[i];
        btoken = dbData.btoken;

        if(btoken == ftoken){
            userFound = true;
            console.log("öööööööööö");
            console.log(zeit);
            if(zeit <= 100) {
                if(100 - zeit > dbData.highscore) {
                    dbData.highscore = "100" - zeit;
                } else {

                }
            } else {
                if( 0 >= dbData.highscore) {
                    dbData.highscore = "0";
                }
                
            }
            
            db[i] = dbData;
        }
    }
    if(userFound == true){
        res.status(200).json({
            message: "done"
        });
    }
});

app.post('/logout', (req, res, next) => {
    let ftoken = req.body.ftoken;
    for(let i = 0; i < db.length; i++){
        dbData = db[i];
        btoken = dbData.btoken;
        if(btoken == ftoken){
            dbData.btoken = " ";
            db[i] = dbData;
        }
    }
    res.status(200).json({
        message: "Abgemeldet!" 
    });

});
module.exports = app;