import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './services/login.service';
import { EmpleadoComponent } from './components/empleado/empleado.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // cliente
    FormsModule,  //para los formularios

  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
