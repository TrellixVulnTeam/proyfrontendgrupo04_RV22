export class Email {
    destinatarios!: string;
    asunto!: string;
    mensaje!: string;
    // adjunto!: Array<any>
}
/*
to: body.destinatarios, //array de destinatarios
    subject: body.asunto, //asuto del mail
    html: body.mensaje, //mensaje en formato html
    attachments: body.adjunto, //para adjuntar archivos
*/