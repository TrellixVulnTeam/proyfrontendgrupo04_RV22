import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {
  email!: Email;
  formCtrl!: FormGroup;
  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.email = new Email();
    this.formCtrl = this.fb.group({
      destinatarios: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.email = new Email();
  }

  sendEmail() {

    this.emailService.sendEmail(this.email)
      .subscribe(
        (result) => {
          console.log(result);
          alert(result.msg);
        },
        (error) => {
          alert(error.msj);
        }
      );

  }

  get destinatarios() {
    return this.formCtrl.get('asunto') as FormControl;
  }
  get asunto() {
    return this.formCtrl.get('asunto') as FormControl;
  }
  get mensaje() {
    return this.formCtrl.get('mensaje') as FormControl;
  }
}
