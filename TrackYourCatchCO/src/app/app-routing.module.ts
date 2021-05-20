import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';
import { AddTripComponent } from './trip/add-trip/add-trip.component';
import { TripComponent } from './trip/trip/trip.component';
import { LoginComponent } from './login/login.component';
import { CatchComponent } from './catch/catch/catch.component';
import { EditTripComponent } from './trip/edit-trip/edit-trip.component';

const routes: Routes = [
  { path: '', component:TripComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: '#', component:TripComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'home', component: TripComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'add-trip', component: AddTripComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'edit/:id', component: EditTripComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'trips/:tripId/catches', component: CatchComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'add-catch', component: CatchComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'edit-catch', component: CatchComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: OktaCallbackComponent },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector): void {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
