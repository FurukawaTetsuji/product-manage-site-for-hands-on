import { TranslateTestingModule } from 'ngx-translate-testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { YesNoDialogComponent } from './yes-no-dialog.component';

describe('YesNoDialogComponent', () => {
  let component: YesNoDialogComponent;
  let fixture: ComponentFixture<YesNoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatDialogModule, TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [YesNoDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(YesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
