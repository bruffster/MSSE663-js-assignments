import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { Employee } from './model/employee.model';

const routes: Routes = [
  { path: '', component:EmployeeComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: '#', component:EmployeeComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'home', component: EmployeeComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired } },
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
