export class Usuario {
    _id!: string;
    username!: string;
    password!: string;
    perfil!: string;

    Usuario(id:string="", username:string="", password:string="", perfil:string=""){
        this._id = id;
        this.username = username;
        this.password = password;

        this.perfil = perfil;
    }
}
