import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessagingComponent } from './error-messaging.component';

describe('ErrorMessagingComponent', () => {
  let component: ErrorMessagingComponent;
  let fixture: ComponentFixture<ErrorMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
