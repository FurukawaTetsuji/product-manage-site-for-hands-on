import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryListingPageComponent } from './purchase-history-listing-page.component';

xdescribe('PurchaseHistoryListingPageComponent', () => {
  let component: PurchaseHistoryListingPageComponent;
  let fixture: ComponentFixture<PurchaseHistoryListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseHistoryListingPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
