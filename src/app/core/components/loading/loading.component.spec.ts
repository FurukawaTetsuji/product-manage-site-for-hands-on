import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule],
      declarations: [LoadingComponent]
    }).compileComponents();
    loadingService = TestBed.inject(LoadingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should not display loading spinner', () => {
      loadingService.stopLoading();
      fixture.detectChanges();
      const debugElement: DebugElement = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(debugElement).toBeFalsy();
    });

    it('should display loading spinner', () => {
      loadingService.startLoading();
      fixture.detectChanges();
      const debugElement: DebugElement = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(debugElement).toBeTruthy();
    });
  });
});
