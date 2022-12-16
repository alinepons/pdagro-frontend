import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'diagnostic',
        component: DiagnosticComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }