import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

    @Input() type ='text';
    @Input() label ='';
    @Input() placeholder ='';
    @Input() autocomplete: string = 'off';
    @Input() options: string[] = [];

    constructor(@Self() public controlDir: NgControl){

      this.controlDir.valueAccessor = this;
    }

        writeValue(obj: any): void{}
        registerOnChange(fn: any): void{}
        registerOnTouched(fn: any): void{}


    get control(): FormControl{
      return this.controlDir.control as FormControl
    }

}
