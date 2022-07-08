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
  hLaboralInicio: Date;
  hLaboralFinal: Date;
  empleado!: Empleado;
  participante!: Empleado;
  empleados!: Array<Empleado>;
  participantes!: Array<Empleado>;
  reunion!: Reunion;

  recursos!: Array<Recurso>;
  recurso!: Recurso;
  recursosReunion!: Array<Recurso>;

  reunionesGuardadas!: Array<Reunion>;
  reuniones!: Array<Reunion>;
  accion!: Boolean;

  constructor(private reunionService: ReunionService, private empleadoService: EmpleadoService, private recursoService: RecursoService, private fb: FormBuilder, private activateRoute: ActivatedRoute, private router: Router) {

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
        this.recursosReunion = new Array<Recurso>();
        this.participantes = new Array<Empleado>();
        this.accion = false;
        this.reunion = new Reunion();
        this.reunion.estado = "Pendiente";
        this.fecha = new Date();
      }
      else {
        this.accion = true;
        this.getReunionId(params['id']);
        console.log(this.reunion);
      }
    })

    

    this.getEmpleados();
    this.getRecursos();
    //this.getReuniones()  Para hacer comprobaciones
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
  
  async altaReunion() {
    this.manejoDeDatos()
    //this.controlColisionOficinas()

    console.log(this.reunion);
    this.reunionService.postReunion(this.reunion).subscribe(
      (result) => {
        console.log("56 " + result);
        alert("Reunion guardada");
      },
    )
    this.router.navigate(['listarReunion']);


  }

  modificarReunion() {
    this.manejoDeDatos()
    console.log(this.reunion);
    this.reunionService.editeReunion(this.reunion).subscribe(
      (result) => {
        console.log("" + result);
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
  async restarRecursos(recursos: Array<Recurso>) {
    recursos.forEach(element => {
      if(element.cantidad != 0){
        if (element.tipo == "Fisico") {
          element.cantidad -= 1;
          this.recursoService.updateRecurso(element).subscribe(
            result => {
              console.log("Cantidad de recursos: " + result)
            }
          )
        }
      }
      else
      {

      }
      

    });
  }

  //Permite gestionar ver la cantidad de recursos disponibles
  sumarRecursos(recursos: Array<Recurso>) {
    recursos.forEach(element => {    
        if (element.tipo == "Fisico") {
          element.cantidad += 1;
          this.recursoService.updateRecurso(element).subscribe(
            result => {
              console.log("Cantidad de recursos: " + result)
            }
          )
        }      
    });
  }

  // ******************************** Manejo de datos ********************************


  async controlColisionOficinas() {

    this.reuniones = new Array<Reunion>();
    this.reunionesGuardadas = new Array<Reunion>();
    
    this.buscarxOficina(this.reuniones,this.reunion.nroOficina);
    this.buscarxdiaMes(this.reunionesGuardadas, "7" , "7");
    //console.log(this.reuniones);
    //console.log(this.reunionesGuardadas);
    
    this.sumarFiltros(this.reuniones, this.reunionesGuardadas);

    console.log(this.reunionesGuardadas);
    console.log(this.reunionesGuardadas.length);
    console.log(this.reunionesGuardadas[0].temaReunion);
    
    this.reunionesGuardadas.forEach((element:Reunion) => {
      console.log("entra1");
      let caso1 = element.horaComienzo == this.reunion.horaComienzo;
      let caso2 = (this.reunion.horaComienzo > element.horaComienzo) && (this.reunion.horaComienzo > element.horaFinal);
      if(caso1 || caso2){
        console.log("No puede guardar la reunion");
        }
      else
      {
        console.log("Se puede guardar la reunion");
      }
    });
  }

  controlarFechayHorarioLaboral() {

    this.hLaboralInicio = new Date()
    this.hLaboralFinal = new Date()

    this.hLaboralInicio.setHours(7, 0);
    this.hLaboralFinal.setHours(22, 0);


    console.log(this.reunion.horaComienzo.hours < 7);

    if (this.reunion.horaComienzo.hours < 7) {
      console.log("antes del horario laboral");
    }

    if (this.reunion.horaFinal.hours > 22) {
      console.log("Fuera de horario laboral");
    }

    if ((this.reunion.horaFinal.hours - this.reunion.horaComienzo.hours) < 1) {
      console.log("La reunion durara muy poco");
    }
  }


  controlColisionParticipantes() {

  }


  manejoDeDatos() {

    this.reunion.dia = " a";//this.reunion.fechaCompleta.getDate().toString();
    this.reunion.mes = " a"; //this.reunion.fechaCompleta.getMonth().toString();
    this.reunion.anio = "a ";//this.reunion.fechaCompleta.getFullYear().toString();
    this.reunion.participantes = this.participantes;
    this.reunion.recursos = this.recursosReunion;

    if(this.reunion.estado=="Pendiente")
      this.restarRecursos(this.reunion.recursos);

    if(this.reunion.estado=="Celebrada" || this.reunion.estado=="Anulada" )
      this.sumarRecursos(this.reunion.recursos);

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




  // ******************************** Servicios FILTRO para validaciones ********************************

  buscarxEmpleado( idEmpleado: string){
    console.log(idEmpleado);
    this.reunionService.getReunionParticipante(idEmpleado).subscribe(
     (result:Array<Reunion>) => {
        result.forEach((element: any) => {
          let reunion= new Reunion();
          if (element.cantidad > 0) {
            Object.assign(reunion, element);
            this.reuniones.push(reunion);
          }

      });
      })
 
  }

  buscarxOficina( reuniones:Array<Reunion>, nroOficina: string) {
    console.log(nroOficina);
    
    
    this.reunionService.getReunionOficina(nroOficina).subscribe(
      (result:Array<Reunion>) => {
        result.forEach((element: Reunion) => {
            reuniones.push(element);
            //console.log(this.reuniones); 
      });

      },
    )
  }

  buscarxdiaMes( reuniones:Array<Reunion>, dia: string, mes: string){
    this.reunionService.getReunionFecha(dia, mes).subscribe(
      (result:Array<Reunion>) => {
        result.forEach((element: Reunion) => {
            reuniones.push(element);
            //console.log(this.reunionesGuardadas);
      });
      },
    )
  }

  /**
   * Compara dos arrays y va quitando los elementos que no coincidan 
   * @param reuniones Array que contiene la informacion
   * @param reunionesFiltro Array que contiene el resultado
   */
  sumarFiltros(reuniones: Array<Reunion>, reunionesFiltro: Array<Reunion>) {    

    if (!reunionesFiltro.length) {
      reuniones.forEach((element:Reunion) => {
        reunionesFiltro.push(element);
      });
    }
    else {
      reuniones.forEach((element:Reunion) => {
        if (!reunionesFiltro.includes(element) ) {
          let i = reunionesFiltro.indexOf(element);
          reunionesFiltro.splice(i, 1);
        }
      });
/*           reuniones = new Array<Reunion>();
          reunionesFiltro.forEach(element => {
            this.reuniones.push(element);
          });  */

    }
  }

}
