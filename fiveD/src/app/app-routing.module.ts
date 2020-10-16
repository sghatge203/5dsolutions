import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AddComponent } from './moment/add/add.component';
import { EditComponent } from './moment/edit/edit.component';
import { ListComponent } from './moment/list/list.component';
import { AuthGuardService as AuthGuard } from '../authGuard/auth-guard.service';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-moment', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'add-moment', component: AddComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-moment/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
