import { Empleado } from "./empleado";
import { Recurso } from "./recurso";

export class Reunion {

    _id!:String;
    dia!:string;
    mes!:string;
    anio!:string;
    horaComienzo!:String;
    horaFinal!:String;
    participantes!:Array<Empleado>;
    nroOficina!:String;
    recursos!:Array<Recurso> // cambiar por clase recurso
    tipoReunion!:String;
    temaReunion!:String;
    estado!:String;

    
}
