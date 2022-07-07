import { Time } from "@angular/common";
import { Empleado } from "./empleado";
import { Recurso } from "./recurso";

export class Reunion {

    _id!:String;
    dia!:string;
    mes!:string;
    anio!:string;
    horaComienzo!:Time;
    horaFinal!:Time;
    participantes!:Array<Empleado>;
    nroOficina!:string;
    recursos!:Array<Recurso> // cambiar por clase recurso
    tipoReunion!:string;
    temaReunion!:string;
    estado!:string;
    fechaCompleta!:Date;

    
}
