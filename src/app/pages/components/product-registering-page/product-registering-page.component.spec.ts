import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegisteringPageComponent } from './product-registering-page.component';

describe('ProductRegisteringPageComponent', () => {
  let component: ProductRegisteringPageComponent;
  let fixture: ComponentFixture<ProductRegisteringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRegisteringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
