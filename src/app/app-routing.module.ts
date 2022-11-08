import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminFrameComponent } from './layouts/admin/admin-frame/admin-frame.component';
import { AuthFrameComponent } from './layouts/auth/auth-frame/auth-frame.component';

/// localhost:4200/dash

const routes: Routes = [
  {
    path: "", // se for digitado qualquer coisa, (localhost4200) é direcionado para a rota dash
    redirectTo: "dash",
    pathMatch: "full"
  },
  {
    path: "",
    component: AuthFrameComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: "",
    component: AdminFrameComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule) // novas rotas
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
