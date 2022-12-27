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
    CompanyComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class ViewsModule { }
