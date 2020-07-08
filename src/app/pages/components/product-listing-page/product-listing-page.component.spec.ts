import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListingPageComponent } from './product-listing-page.component';

xdescribe('ProductListingPageComponent', () => {
  let component: ProductListingPageComponent;
  let fixture: ComponentFixture<ProductListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListingPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
