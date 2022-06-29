import { Empleado } from "./empleado";

export class Reunion {

    _id!:String;
    dia!:string;
    mes!:string;
    anio!:string;
    horaComienzo!:String;
    horaFinal!:String;
    participantes!:Array<Empleado>;
    nroOficina!:String;
    //recursos!:Array<any> // cambiar por clase recurso
    tipoReunion!:String;
    temaReunion!:String;
    estado!:String;

    
}
