import { Empleado } from "./empleado";

export class Reunion {

    _id!:String;
    dia!:String;
    mes!:String;
    anio!:String;
    horaComienzo!:Date;
    horaFinal!:Date;
    participantes!:Array<Empleado>;
    nroOficina!:String;
    //recursos!:Array<any> // cambiar por clase recurso
    tipoReunion!:String;
    temaReunion!:String;
    estado!:String;

    
}
