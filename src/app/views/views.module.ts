import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CompanyComponent } from './company/company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgbActiveModal, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { ComponentsModule } from '../components/components.module';
import { RepositoryComponent } from './repository/repository.component';

export function playerFactory() {
  return player;
}

const maskConfig: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    HomeComponent,
    ViewsComponent,
    DiagnosticComponent,
    CompanyComponent,
    AdminComponent,
    AboutComponent,
    RepositoryComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModalModule,
    NgbDropdownModule,
    NgxMaskModule.forRoot(maskConfig),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    NgbActiveModal
  ]
})
export class ViewsModule { }
