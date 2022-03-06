import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/service/auth.guard';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // {
  //   path: '/',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '/',
  //   component: DashboardComponent,
  // },

  // {
  //   path: 'app',
  //   component: AppComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'home',
  //       component: DashboardComponent,
  //     },
  //     {
  //       path: '**',
  //       redirectTo: '/',
  //     },
  //     // {
  //     //   path: 'login',
  //     //   component: LoginComponent,
  //     // },
  //   ],
  // },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
