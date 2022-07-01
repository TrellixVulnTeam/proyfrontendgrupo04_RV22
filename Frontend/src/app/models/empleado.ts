import { Usuario } from "./usuario";

export class Empleado {
    _id!:string;
    apellido!: string;
    nombre!: string;
    legajo!: string;
    correo!: string;
    dependencia!: string;
    user!:Usuario;
}
