import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HighscoreComponent } from './highscore/highscore.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'highscore', component: HighscoreComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
