import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.chatForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.chatForm.valid) {
      alert('You have successfully sent your message to your soulmate');
      this.chatForm.reset();
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  onClear() {
    this.chatForm.reset();
  }

}
