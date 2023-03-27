import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { CompanyGuard } from '../core/guards/company.guard';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [

  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'diagnostic/:id',
        component: DiagnosticComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [CompanyGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
