import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

xdescribe('DummyPurchasingPageComponent', () => {
  let component: DummyPurchasingPageComponent;
  let fixture: ComponentFixture<DummyPurchasingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyPurchasingPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DummyPurchasingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
