import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-mat-datepicker',
  templateUrl: './mat-datepicker.component.html',
  styleUrls: ['./mat-datepicker.component.scss']
})
export class MatDatepickerComponent implements OnInit {
  @Input() placeholder: string;
  @Input() initialValue: Date;
  @Input() required: boolean;
  @Input() locale: string;
  @Output() event: EventEmitter<Date> = new EventEmitter<Date>();

  date = new FormControl<Date>(null);
  myForm = this.formBuilder.group({
    date: this.date
  });

  constructor(private formBuilder: FormBuilder, private adapter: DateAdapter<any>) {}

  ngOnInit(): void {
    this.adapter.setLocale(this.locale);
    this.setupDateValue();
    this.setupValidators();
  }

  reset(): void {
    this.setupDateValue();
  }

  addEvent(): void {
    this.event.emit(this.date.value);
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupDateValue(): void {
    if (this.initialValue) {
      this.date.setValue(this.initialValue);
    } else {
      this.date.setValue(null);
    }
  }

  private setupValidators(): void {
    if (this.required) {
      this.date.setValidators([Validators.required]);
    }
  }
}
