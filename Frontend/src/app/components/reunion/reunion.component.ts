import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import Swal from 'sweetalert2';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';


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

  idEmpleado!: string;
  temaReunion!: string;
  fechaReunion!: string;
  legajoEmpleado!: string;
  nroOficina!: string;

  dia!: string;
  mes!: string;


  reunionesFiltro!: Array<Reunion>;

  constructor(private reunionService: ReunionService,private recursoService:RecursoService , private router: Router, private empleadoService: EmpleadoService) { }

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
        this.reunionesFiltro = new Array<Reunion>();

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

  modificarReunion(id: String) {
    this.router.navigate(['altaReunion/' + id]);
  }

  borrarReunion(reunion: Reunion) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Reunion eliminada!',
          '',
          'success'
        )
        if(reunion.estado!="Celebrada")
          this.sumarRecursos(reunion.recursos);
        this.reunionService.deleteReunion(reunion).subscribe(
          (result) => {
            console.log("Reunion eliminada");
          },
        )
        this.getReuniones();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    


    
  }

  pdfReunion(reunion: Reunion) {
    this.router.navigate(['reunionpdf', reunion._id]);
  }

  // ******************************** Control de recursos ********************************

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


  // ******************************** Filtros ********************************

  sumarFiltros() {
    if (!this.reunionesFiltro.length)          // reunionesFiltro = reunionesTEMPORAL  
    {
      this.reuniones.forEach(element => {
        this.reunionesFiltro.push(element);

      });
    }
    else {
      this.reuniones.forEach(element => {
        if (!this.reunionesFiltro.includes(element)) {
          let i = this.reunionesFiltro.indexOf(element);
          this.reunionesFiltro.splice(i, 1);
        }

      });
      this.reuniones = new Array<Reunion>();
      this.reunionesFiltro.forEach(element => {
        this.reuniones.push(element);
      });

    }
  }

  buscarxEmpleado() {
    console.log(this.idEmpleado);
    this.reunionService.getReunionParticipante(this.idEmpleado).subscribe(
      result => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        Object.assign(this.reuniones, result);
        this.sumarFiltros();

      })
  }

  buscarxOficina() {
    console.log(this.nroOficina);
    this.reunionService.getReunionOficina(this.nroOficina).subscribe(
      (result) => {
        this.reuniones = new Array<Reunion>();
        Object.assign(this.reuniones, result);
        console.log("133" + this.reuniones);
        this.sumarFiltros();

      },
    )
  }

  buscarxdiaMes() {
    console.log(this.dia);
    console.log(this.mes);
    this.reunionService.getReunionFecha(this.dia, this.mes).subscribe(
      (result) => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        Object.assign(this.reuniones, result);
        this.sumarFiltros();
      },
    )
  }



}
