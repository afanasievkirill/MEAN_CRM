import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainPageLayoutComponent} from "./shared/layouts/main-page-layout/main-page-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
    ]
  },
  {
    path: '',
    component: MainPageLayoutComponent,
    children: []
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
