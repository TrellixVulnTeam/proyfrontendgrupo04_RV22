import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';



@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reuniones!: Array<Reunion>;
  reunion!: Reunion;
  empleado!: Empleado;
  empleados!: Array<Empleado>;

  idEmpleado!:string;
  temaReunion!:string;
  fechaReunion!:string;
  legajoEmpleado!:string;
  nroOficina!:string;

  dia!:string;
  mes!:string
  constructor(private reunionService: ReunionService, private router: Router, private empleadoService: EmpleadoService) { }



  ngOnInit(): void {
    this.getReuniones();
    this.getEmpleados();
  }



  // ******************************** Implementacion de servicios ********************************
  async getEmpleados() {
    await this.getReuniones();
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

  async getReuniones() {
    this.reunionService.getReuniones().subscribe(
      (result) => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        result.forEach((element: any) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion, element);
          this.reuniones.push(this.reunion);
        })
      },
    )
  }

  altaReunion() {
    this.router.navigate(['altaReunion/0']);
  }

  modificarReunion(id:String) {
    this.router.navigate(['altaReunion/'+id]);
  }

  borrarReunion(reunion: Reunion) {

    this.reunionService.deleteReunion(reunion).subscribe(
      (result) => {
        console.log("Reunion eliminada");
      },
    )
    this.getReuniones();
  }


  pdfReunion(reunion: Reunion) {
    this.router.navigate(['reunionpdf', reunion._id]);
  }

  mostrarInfo() {

  }

  // ******************************** Filtros ********************************
  buscarxLegajo(){
    this.reunionService.getReunionPorLegajo(this.legajoEmpleado).subscribe(
      result => {
        console.log(result);
            /*this.reuniones = new Array<Reunion>();
             result.forEach((element: any) => {
              this.reunion = new Reunion();
              Object.assign(this.reunion, element);
              this.reuniones.push(this.reunion);
            }) */
          },
        )
    }
    


  buscarxEmpleado(){

    console.log(this.idEmpleado);

    this.reunionService.getReunionParticipante(this.idEmpleado).subscribe(
      result => {
        console.log(result);
         this.reuniones = new Array<Reunion>();
          Object.assign(this.reuniones, result);
      }) 
  }

  buscarxOficina(){
    console.log(this.nroOficina);
    this.reunionService.getReunionOficina(this.nroOficina).subscribe(
      (result) => {
          this.reuniones = new Array<Reunion>();
          Object.assign(this.reuniones,result);
          console.log("133"+this.reuniones);
      },
    )
  }

  buscarxdiaMes(){
    console.log(this.dia);
    console.log(this.mes);
    this.reunionService.getReunionFecha(this.dia,this.mes).subscribe(
      (result) => {
        console.log(result);
         this.reuniones = new Array<Reunion>();
          Object.assign(this.reuniones, result);
         
      },
    )
  }

}
