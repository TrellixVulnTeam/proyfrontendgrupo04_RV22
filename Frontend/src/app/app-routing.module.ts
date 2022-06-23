import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    //cuando no ingrese nada va al login
    {path: '', redirectTo:'login',pathMatch:'full'}, 
    //Las rutas validas
    {path: 'login', component: LoginComponent}, 
   //cuando se ingresa cualquier otra ruta volvera al login
    {path: '**', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
