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
import { EstadisticaComponent } from './components/estadistica/estadistica.component';


const routes: Routes = [
  //cuando no ingrese nada va al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //Las rutas validas
  { path: 'home', component: HomeComponent },
  { path: 'altaReunion', component: AltaReunionComponent },
  { path: 'listarReunion', component: ReunionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reunionpdf/:id', component: ReunionPdfComponent },
  { path: "empleado", component: EmpleadoComponent },
  { path: "empleado-form/:id", component: EmpleadoFormComponent },
  { path: "listarRecurso", component: ListarRecursoComponent },
  { path: "altaRecurso", component: AltaRecursoComponent },
  { path: "calendario", component: CalendarioComponent },
  { path: "empleado", component: EmpleadoComponent },
  { path: "empleado-form/:id", component: EmpleadoFormComponent },
  { path: "usuario-form/:id", component: UsuarioFormComponent },
  { path: "estadisticas", component: EstadisticaComponent },
  { path: "calendario", component: CalendarioComponent },
  { path: "empleado-form/:id", component: EmpleadoFormComponent },


  //cuando se ingresa cualquier otra ruta volvera al login
  //{path: '**', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
