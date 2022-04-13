import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    CardComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule  
  ],
  exports : [
    CardComponent,
    LoginComponent,    
    RegisterComponent,
    ForgotPasswordComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
