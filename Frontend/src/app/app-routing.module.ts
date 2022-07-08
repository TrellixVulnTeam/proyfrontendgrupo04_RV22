import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaReunionComponent } from './components/alta-reunion/alta-reunion.component';

import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReunionComponent } from './components/reunion/reunion.component';
import { ReunionPdfComponent } from './components/reunion-pdf/reunion-pdf.component';
import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { AltaRecursoComponent } from './components/alta-recurso/alta-recurso.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NoParticipanteComponent } from './components/no-participante/no-participante.component';
import { HistorialParticipanteComponent } from './components/historial-participante/historial-participante.component';
import { AgendaParticipanteComponent } from './components/agenda-participante/agenda-participante.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';

import { AuthAGuard } from './components/guardian/auth-a.guard';
import { AuthPGuard } from './components/guardian/auth-p.guard';



const routes: Routes = [
    //cuando no ingrese nada va al login
    {path: '', redirectTo:'login',pathMatch:'full'}, 
    ////rutas que puede acceder el Administrador
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'altaReunion/:id', component:AltaReunionComponent,
    canActivate: [AuthAGuard]},
    {path: 'listarReunion', component:ReunionComponent,
    canActivate: [AuthAGuard]},
    {path: 'reunionpdf/:id', component:ReunionPdfComponent},
    {path:"empleado",component:EmpleadoComponent,
    canActivate: [AuthAGuard]},
    {path:"empleado-form/:id",component:EmpleadoFormComponent,
    canActivate: [AuthAGuard]},
    {path:"listarRecurso",component:ListarRecursoComponent,
    canActivate: [AuthAGuard]},
    {path:"altaRecurso/:id",component:AltaRecursoComponent,
    canActivate: [AuthAGuard]},
    {path:"calendario",component:CalendarioComponent,
    canActivate: [AuthAGuard]},
    {path:"empleado-form/:id",component:EmpleadoFormComponent,
    canActivate: [AuthAGuard]},
    {path:"usuario-form/:id",component:UsuarioFormComponent,
    canActivate: [AuthAGuard]},
    {path:"calendario",component:CalendarioComponent,
    canActivate: [AuthAGuard]},
    {path:"empleado-form/:id",component:EmpleadoFormComponent ,
    canActivate: [AuthAGuard]},
    {path: "estadisticas", component: EstadisticaComponent,
    canActivate: [AuthAGuard]},
    //rutas que puede acceder el participante
    {path:"no-participante",component:NoParticipanteComponent,
    canActivate: [AuthPGuard]},
    {path:"agenda-participante",component:AgendaParticipanteComponent,
    canActivate: [AuthPGuard]},
    {path:"historial-participante",component:HistorialParticipanteComponent,
    canActivate: [AuthPGuard]},
    //cuando se ingresa cualquier otra ruta volvera al login
    {path: '**', redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
