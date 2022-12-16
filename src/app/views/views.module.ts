import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    HomeComponent,
    ViewsComponent,
    DiagnosticComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class ViewsModule { }
