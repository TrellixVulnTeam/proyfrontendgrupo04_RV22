import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    //cuando no ingrese nada va al login
    {path: '', redirectTo:'login',pathMatch:'full'}, 
    //Las rutas validas
    {path: 'login', component: LoginComponent}, 
    {path: 'empleadosRegistrados', component:EmpleadoComponent},
   //cuando se ingresa cualquier otra ruta volvera al login
    {path: '**', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
