
import { Injector, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';

import { LoginComponent } from './login/login.component';


import { OktaAuthGuard, OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector): void {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: OktaCallbackComponent },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }