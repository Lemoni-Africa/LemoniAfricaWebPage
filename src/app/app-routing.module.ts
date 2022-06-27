import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/service/auth.guard';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { AppLayoutComponent } from './Component/app-layout/app-layout.component';
import { CareerComponent } from './Component/career/career.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'careers',
        component: CareerComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      // {
      //   path: 'faqs',
      //   component: FaqComponent,
      //   //canActivate: [AuthGuard]
      // },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
