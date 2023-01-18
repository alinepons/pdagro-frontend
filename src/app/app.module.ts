import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar : true,
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true
    }),
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
