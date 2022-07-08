import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alta-recurso',
  templateUrl: './alta-recurso.component.html',
  styleUrls: ['./alta-recurso.component.css']
})
export class AltaRecursoComponent implements OnInit {

  tipo!:String;
  nombre!:String;
  stock!:number;
  recurso!:Recurso;
  accion!:Boolean;
  esconderDigital:Boolean=false;
  formRecurso: FormGroup ;

  constructor(private recursoService:RecursoService,private activateRoute:ActivatedRoute,private fb:FormBuilder, private router:Router) { 
    this.formRecurso = this.fb.group({
      tipoRecurso : ['', Validators.required],
      nombreRecurso : ['', Validators.required],
      stockRecurso : ['', Validators.required],     
  })
  }


    
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      
      if(params['id'] == '0'){
        this.accion=false;
        this.recurso= new Recurso();
      }
      else{
        this.accion=true;
        this.getRecursoId(params['id']);
        let d = document.getElementById("stockRecurso") as HTMLInputElement;
      }
    }) 

  }

  postRecurso(){
    this.recurso = new Recurso();
    console.log(this.recurso);
    this.recursoService.postRecurso(this.recurso).subscribe(
      (result) => {
        console.log(result);
        Swal.fire(
          'Recurso guardado!',
          '',
          'success'
        )
      }
    )
    this.router.navigate(['listarRecurso']);
  }

  editarRecurso(){
    console.log(this.recurso);
    this.recursoService.updateRecurso(this.recurso).subscribe(
      (result) => {
        console.log(result);
        Swal.fire(
          'Recurso modificado!',
          '',
          'success'
        )
      }
    )
    this.router.navigate(['listarRecurso']);

  }


  getRecursoId(id:string){
    this.recurso = new Recurso();
    this.recursoService.getRecursoId(id).subscribe(
      (result) => {
        console.log(result)
        Object.assign(this.recurso,result);
      }
    )
  }


  // ***************** Control ********************

  controlRecurso()
  { 
    let d = document.getElementById("stockRecurso") as HTMLInputElement;
    if(this.recurso.tipo=="Digital")
    {
      this.esconderDigital=true;
      this.recurso.cantidad=1;
      d.disabled = true;
      
    }
    else
    {
      d.disabled = false;
    }
    
  }

}
