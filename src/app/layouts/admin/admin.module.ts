import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminFrameComponent } from './admin-frame/admin-frame.component';
import { DashComponent } from 'src/app/pages/dash/dash.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { EnterpriseListComponent } from 'src/app/pages/enterprise-list/enterprise-list.component';
import { EnterpriseRegisterComponent } from 'src/app/pages/enterprise-register/enterprise-register.component';
import { EnterpriseCheckComponent } from 'src/app/pages/enterprise-check/enterprise-check.component';
import { EnterpriseReportComponent } from 'src/app/pages/enterprise-report/enterprise-report.component';


@NgModule({
  declarations: [
    AdminFrameComponent,
    DashComponent,
    EnterpriseListComponent,
    EnterpriseRegisterComponent,
    EnterpriseCheckComponent,
    EnterpriseReportComponent, 
    /*
      ... Aqui vai ir a declaração dos componentes das outras páginas do sistema.
     */
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ComponentsModule
  ]
})
export class AdminModule { }
