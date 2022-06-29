import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reuniones!:Array<Reunion>;
  reunion!:Reunion;
  constructor(private reunionService:ReunionService, private router:Router) { }

  ngOnInit(): void {
    this.getReuniones();
  }

  getReuniones()
  {
    this.reunionService.getReuniones().subscribe(
      (result) => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        result.forEach((element:any )=>{
          this.reunion = new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        })
      },
    )
  }

  altaReunion(){
    this.router.navigate(['altaReunion']);
  }
}
