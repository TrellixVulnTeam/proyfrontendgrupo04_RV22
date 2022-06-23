import { Empleado } from "./empleado";

export class Reunion {

    _id!:String;
    fechaHoraComienzo!:Date;
    fechaHoraFinal!:Date;
    participantes!:Array<Empleado>;
    nroOficina!:String;
    recursos!:Array<any> // cambiar por clase recurso
    tipoReunion!:String;
    temaReunion!:String;
    estado!:String;
    
}
