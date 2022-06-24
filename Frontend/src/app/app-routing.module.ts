import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEmpleadoComponent } from './components/form/alta-empleado/alta-empleado.component';
import { AltaReunionComponent } from './components/form/alta-reunion/alta-reunion.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { LoginComponent } from './components/login/login.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';

const routes: Routes = [
  //cuando no ingrese nada va al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //Las rutas validas
  { path: 'login', component: LoginComponent },
  { path: 'empleadosRegistrados', component: EmpleadoComponent },
  //cuando se ingresa cualquier otra ruta volvera al login
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'alta-empleado', component: AltaEmpleadoComponent },
  { path: 'alta-reunion', component: AltaReunionComponent },
  { path: 'estadisticas', component: EstadisticaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
