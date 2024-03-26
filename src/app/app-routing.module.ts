import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthUserComponent} from "./components/auth-user/auth-user.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'login',
    component: AuthUserComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
