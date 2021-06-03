import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'highscore', component: HighscoreComponent},
{path: 'puzzle', component: PuzzleComponent},
{path: 'profile', component: ProfileComponent},
{path: 'faq', component: FaqComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }