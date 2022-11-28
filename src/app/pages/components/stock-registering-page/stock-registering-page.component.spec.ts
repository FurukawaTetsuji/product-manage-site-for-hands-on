import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRegisteringPageComponent } from './stock-registering-page.component';

xdescribe('StockRegisteringPageComponent', () => {
  let component: StockRegisteringPageComponent;
  let fixture: ComponentFixture<StockRegisteringPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockRegisteringPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StockRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
