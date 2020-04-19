import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRegisteringPageComponent } from './stock-registering-page.component';

describe('StockRegisteringPageComponent', () => {
  let component: StockRegisteringPageComponent;
  let fixture: ComponentFixture<StockRegisteringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRegisteringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
