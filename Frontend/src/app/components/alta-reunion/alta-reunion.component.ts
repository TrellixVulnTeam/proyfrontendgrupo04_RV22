import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-alta-reunion',
  templateUrl: './alta-reunion.component.html',
  styleUrls: ['./alta-reunion.component.css']
})
export class AltaReunionComponent implements OnInit {

  empleado!:Empleado;
  empleados!:Array<Empleado>;
  constructor(private reunionService:ReunionService, private empleadoService:EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados()
  {
    this.empleadoService.getEmpleados().subscribe(
      (result) => {
        this.empleados = new Array<Empleado>();
        result.forEach((element:any)=>{
          this.empleado = new Empleado();
          Object.assign(this.empleado,element);
          this.empleados.push(this.empleado);
        })
      },
    )
  }

}
