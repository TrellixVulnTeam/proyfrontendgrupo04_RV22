import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaReunionComponent } from './components/alta-reunion/alta-reunion.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { LoginComponent } from './components/login/login.component';
import { ReunionComponent } from './components/reunion/reunion.component';

const routes: Routes = [
    //cuando no ingrese nada va al login
    {path: '', redirectTo:'login',pathMatch:'full'}, 
    //Las rutas validas
    {path: 'altaReunion', component:AltaReunionComponent},
    {path: 'listarReunion', component:ReunionComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'empleadosRegistrados', component:EmpleadoComponent},

    //cuando se ingresa cualquier otra ruta volvera al login
    //{path: '**', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
