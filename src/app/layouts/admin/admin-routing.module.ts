import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from 'src/app/pages/dash/dash.component';
import { EnterpriseCheckComponent } from 'src/app/pages/enterprise-check/enterprise-check.component';
import { EnterpriseListComponent } from 'src/app/pages/enterprise-list/enterprise-list.component';
import { EnterpriseRegisterComponent } from 'src/app/pages/enterprise-register/enterprise-register.component';
import { EnterpriseReportComponent } from 'src/app/pages/enterprise-report/enterprise-report.component';

const routes: Routes = [
  {
    path: 'dash',
    component: DashComponent
  },
  {
    path: 'enterprise-register',
    component: EnterpriseRegisterComponent
  },
  {
    path: 'enterprise-list',
    component: EnterpriseListComponent
  },
  {
    path: 'enterprise-check',
    component: EnterpriseCheckComponent
  },
  {
    path: 'enterprise-report',
    component: EnterpriseReportComponent
  },
  /*
    Rotas das outras páginas...
   */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
