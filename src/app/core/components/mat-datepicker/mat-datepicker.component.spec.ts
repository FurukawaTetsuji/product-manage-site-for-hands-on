import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatDatepickerComponent } from './mat-datepicker.component';

const expectedDate = new Date('2021/01/01');
const temporaryDate = new Date('2022/12/31');

describe('MatDatepickerComponent', () => {
  let component: MatDatepickerComponent;
  let fixture: ComponentFixture<MatDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [FormBuilder, NativeDateAdapter],
      declarations: [MatDatepickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MatDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    describe('initialValue input', () => {
      it('should set initial value', () => {
        component.initialValue = expectedDate;
        component.ngOnInit();
        expect(component.date.value).toEqual(expectedDate);
      });
      it('should not set initial value', () => {
        component.ngOnInit();
        expect(component.date.value).toEqual(null);
      });
    });

    describe('required input', () => {
      it('should set required validator', () => {
        spyOn(component.date, 'setValidators').and.callThrough();
        component.required = true;
        component.ngOnInit();
        expect(component.date.setValidators).toHaveBeenCalledWith([Validators.required]);
      });
      it('should not set required validator', () => {
        spyOn(component.date, 'setValidators').and.callThrough();
        component.required = false;
        component.ngOnInit();
        expect(component.date.setValidators).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('#reset', () => {
    it('Should return to the initial value', () => {
      component.initialValue = expectedDate;
      component.date.setValue(temporaryDate);
      component.reset();
      expect(component.date.value).toEqual(expectedDate);
    });
    it('Should return to empty', () => {
      component.date.setValue(temporaryDate);
      component.reset();
      expect(component.date.value).toEqual(null);
    });
  });

  describe('#addEvent', () => {
    it('should raise the event', () => {
      spyOn(component.event, 'emit').and.callThrough();

      const htmlInputElemtnt = fixture.debugElement.query(By.css('input')).nativeElement;
      htmlInputElemtnt.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.event.emit).toHaveBeenCalledWith(component.date.value);
    });
  });
});
