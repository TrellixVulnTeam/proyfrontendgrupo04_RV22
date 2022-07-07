import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReunionService } from 'src/app/services/reunion.service';


@Component({
  selector: 'app-alta-reunion',
  templateUrl: './alta-reunion.component.html',
  styleUrls: ['./alta-reunion.component.css']
})
export class AltaReunionComponent implements OnInit {

  formReunion: FormGroup;

  fecha!: Date;
  hInicio!: String;
  hFinal!: String;
  empleado!: Empleado;
  participante!: Empleado;
  empleados!: Array<Empleado>;
  participantes!: Array<Empleado>;
  reunion!: Reunion;

  recursos!: Array<Recurso>;
  recurso!: Recurso;
  recursosReunion!: Array<Recurso>;

  reunionesGuardadas!: Array<Reunion>;
  accion!: Boolean;

  constructor(private reunionService: ReunionService, private empleadoService: EmpleadoService, private recursoService: RecursoService, private fb: FormBuilder, private activateRoute: ActivatedRoute, private router:Router) {

    this.formReunion = this.fb.group({
      temaReunion: ['', Validators.required],
      tipoReunion: ['', Validators.required],
      fechaReunion: ['', Validators.required],
      oficinaReunion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFinal: ['', Validators.required]

    })
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {

      if (params['id'] == '0') {
        this.accion = false;
        this.reunion=new Reunion();
        this.reunion.estado ="Pendiente";
      }
      else {
        this.accion = true;
        this.getReunionId(params['id']);
      }
    })

    this.recursosReunion = new Array<Recurso>();
    this.participantes = new Array<Empleado>();

    this.reunion = new Reunion();
    this.fecha = new Date();
    this.getEmpleados();
    this.getRecursos();
    //  this.getReuniones()  Para hacer comprobaciones
  }


  // ******************************** Implementacion de servicios ********************************

  async getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (result) => {
        this.empleados = new Array<Empleado>();
        result.forEach((element: any) => {
          this.empleado = new Empleado();
          Object.assign(this.empleado, element);
          this.empleados.push(this.empleado);
        })
      },
    )
  }

  async getRecursos() {
    await this.getEmpleados()
    this.recursoService.getRecursos().subscribe(
      (result) => {
        this.recursos = new Array<Recurso>();
        result.forEach((element: any) => {
          this.recurso = new Recurso();
          if (element.cantidad > 0) {
            Object.assign(this.recurso, element);
            this.recursos.push(this.recurso);
          }

        });
      }
    )
  }

  async getReuniones() {
    await this.getRecursos();
    this.reunionService.getReuniones().subscribe(
      (result) => {
        console.log(result);
        this.reunionesGuardadas = new Array<Reunion>();
        result.forEach((element: any) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion, element);
          this.reunionesGuardadas.push(this.reunion);
        })
      },
    )
  }

altaReunion()
{
  this.manejoDeDatos()
  //this.controlColisionOficinas(this.reunion)
  
  console.log(this.reunion);
  this.reunionService.postReunion(this.reunion).subscribe(
    (result) => {
        console.log("56 "+ result);
        alert("Reunion guardada");
    },
  )
    this.router.navigate(['listarReunion']);
  
  
}

modificarReunion(){
  this.manejoDeDatos()
  console.log(this.reunion);
  this.reunionService.editeReunion(this.reunion).subscribe(
    (result) => {
        console.log(""+ result);
        alert("Reunion modificada");
    },
  )
  this.router.navigate(['listarReunion']);
}

  getReunionId(id: string) {
    this.reunionService.getReunionId(id).subscribe(
      (result) => {
        console.log(result);
        this.reunion = new Reunion();
        Object.assign(this.reunion, result);
      }
    )
  }
  // ******************************** Manejo de recursos ********************************
  //Permite gestionar ver la cantidad de recursos disponibles
  restarRecursos(recursos: Array<Recurso>) {
    recursos.forEach(element => {
      if (element.tipo == "Fisico") {
        element.cantidad -= 1;
        this.recursoService.updateRecurso(element).subscribe(
          result => {
            console.log("Cantidad de recursos: " + result)
          }
        )

      }

    });
  }


  // ******************************** Manejo de datos ********************************


controlColisionOficinas(reunion:Reunion){
    let guardar=true;

    for (let i = 0; i < this.reunionesGuardadas.length && guardar==true; i++) {
      if(this.reunionesGuardadas[i].nroOficina == reunion.nroOficina){
        if(this.reunionesGuardadas[i].dia == reunion.dia && this.reunionesGuardadas[i].mes== reunion.mes){
          if(this.reunionesGuardadas[i].horaComienzo == reunion.horaComienzo){
              guardar=false;
              alert("No se puede elegir esta oficina en este horario")
          }
        }
      }
    }

    return guardar;
  }

  controlColisionParticipantes() {

  }

  controlColisionRecursosFisicos() {

  }

  manejoDeDatos() {

    this.reunion.dia = this.fecha.getDate().toString();
    this.reunion.mes = (this.fecha.getMonth() + 1).toString();
    this.reunion.anio = this.fecha.getFullYear().toString();
    this.reunion.participantes = this.participantes;
    this.reunion.recursos = this.recursosReunion;
    this.reunion.fechaCompleta = this.fecha;
    this.restarRecursos(this.reunion.recursos);

  }




  // ******************************** Control de los participantes ********************************

  addRemoveEmpleado(emp: Empleado, $event: any) {
    if ($event.checked == true) {
      this.addEmpleado(emp);
    } else {
      this.removeEmpleado(emp);
    }
    console.log("Participantes: ", this.participantes);
  }

  addEmpleado(empleado: Empleado): void {
    if (!this.UserExists(empleado)) {
      this.participantes.push(empleado);
    }
  }
  removeEmpleado(empleado: Empleado): void {
    for (var _i = 0; _i < this.participantes.length; _i++) {
      if (this.participantes[_i]._id == empleado._id) {
        this.participantes.splice(_i, 1)
      }
    }
  }
  UserExists(empleado: Empleado): boolean {
    let exists = false;
    for (var _i = 0; _i < this.participantes.length; _i++) {
      if (this.participantes[_i]._id == empleado._id) {
        exists = true;
      }
    }
    return exists;
  }

  // ******************************** Control de los recursos ********************************

  addRemoveRecursos(rec: Recurso, $event: any) {
    if ($event.checked == true) {
      this.addRecursos(rec);
    } else {
      this.removeRecursos(rec);
    }
    console.log("Recursos: ", this.recursosReunion);
  }

  addRecursos(recurso: Recurso): void {
    if (!this.recursoExists(recurso)) {
      this.recursosReunion.push(recurso);
    }
  }
  removeRecursos(recurso: Recurso): void {
    for (var _i = 0; _i < this.recursosReunion.length; _i++) {
      if (this.recursosReunion[_i]._id == recurso._id) {
        this.recursosReunion.splice(_i, 1)
      }
    }
  }
  recursoExists(recurso: Recurso): boolean {
    let exists = false;
    for (var _i = 0; _i < this.recursosReunion.length; _i++) {
      if (this.recursosReunion[_i]._id == recurso._id) {
        exists = true;
      }
    }
    return exists;
  }


  marcarEmpleado() {

  }


  // Mostrar fecha

  mostrarFecha(){
    console.log(this.fecha);
  }




}
