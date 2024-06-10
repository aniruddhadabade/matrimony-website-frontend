import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { RegistrationInfo } from '../../models/registrationInfo';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormSubmitted: boolean = false;
  rid:number=1
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
      confirmPassword: ['', Validators.required]
      
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit(e: Event):void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value; 
       // userName: this.registrationForm.value.userName,
      //  email: this.registrationForm.value.email,
       // password: this.registrationForm.value.password,

      this.registrationService.createRegistration(registrationData).subscribe(
        (response) => {
         
          Swal.fire({
            icon: 'success',
            title: 'Verify Your Email',
            text: 'Check Your Email for Email Verification',
            confirmButtonText: 'OK'
          });

        /*  emailjs
          .sendForm('service_idpscjs', 'template_qp6gco9', e.target as HTMLFormElement , {
            publicKey: 'nru92-XPNoTwqzAhH',
              }
            )
            .then(
              () => {
                console.log('SUCCESS!');
              },
              (error) => {
                console.log('FAILED...', (error as EmailJSResponseStatus).text);
              }
            );

          this.router.navigate(['/verify-email']);*/
           this.router.navigate(['/user', this.registrationForm.value.userName] );
        },
        (error) => {
          console.error('Error during registration:', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Error',
            text: 'An error occurred during registration. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Mark all fields as touched to display validation errors
      Object.values(this.registrationForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value != confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordsNotMatch: true });
    }
  }
/*
  sendConfirmationEmail(email: string, userName: string) {
    const serviceID = 'service_idpscjs';
    const templateID = 'template_qp6gco9';
    const userID = 'nru92-XPNoTwqzAhH';
    const templateParams = {
      user_email: email,
      user_name: userName
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  }*/
}
