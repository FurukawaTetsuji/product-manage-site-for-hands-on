import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { UrlConst } from './pages/constants/url-const';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create the app', () => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

    it('should have as title _ product-manage-site-for-hands-on', () => {
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('product-manage-site-for-hands-on');
    });
  });

  describe('#isSignInPage', () => {
    it('should be true _ slash', () => {
      spyOnProperty(router, 'url').and.returnValue(UrlConst.SLASH);
      expect(component.isSignInPage()).toBeTruthy();
    });

    it('should be true _ sign in', () => {
      spyOnProperty(router, 'url').and.returnValue(UrlConst.SLASH + UrlConst.PATH_SIGN_IN);
      expect(component.isSignInPage()).toBeTruthy();
    });

    it('should be false', () => {
      spyOnProperty(router, 'url').and.returnValue(UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING);
      expect(component.isSignInPage()).toBeFalsy();
    });
  });
});
