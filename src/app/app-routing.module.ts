import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
