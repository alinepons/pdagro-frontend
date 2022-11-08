import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemDbService } from './test/in-mem-db.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { EnterpriseListComponent } from './pages/enterprise-list/enterprise-list.component';
import { EnterpriseRegisterComponent } from './pages/enterprise-register/enterprise-register.component';
import { EnterpriseCheckComponent } from './pages/enterprise-check/enterprise-check.component';
import { EnterpriseReportComponent } from './pages/enterprise-report/enterprise-report.component';

@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,

    // Utiliza in-memory data store.
    //HttpClientInMemoryWebApiModule.forRoot(InMemDbService, { delay: 3800 }),

    // Adicionado para poder utilizar toasts de avisos.
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
