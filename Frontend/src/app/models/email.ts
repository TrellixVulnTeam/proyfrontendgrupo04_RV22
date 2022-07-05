export class Email {
    destinatarios!: Array<String>
    asunto!: String;
    mensaje!: String;
    adjunto!: any;
}
/*
to: body.destinatarios, //array de destinatarios
    subject: body.asunto, //asuto del mail
    html: body.mensaje, //mensaje en formato html
    attachments: body.adjunto, //para adjuntar archivos
*/