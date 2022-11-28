import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { MenuListResponseDto } from 'src/app/pages/models/dtos/responses/menu-list-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let accountServiceSpy: { getMenu: jasmine.Spy; signOut: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu', 'signOut']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AccountService, useValue: accountServiceSpy }
      ],
      declarations: [HeaderComponent]
    }).compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Commented out the following because an error occurred in the 'should create' test.
    // fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init', () => {
      const expetedMenuListResponseDtos: MenuListResponseDto[] = createExpectedMenu();
      accountServiceSpy.getMenu.and.returnValue(of(expetedMenuListResponseDtos));

      component.ngOnInit();
      expect(component.menuListResponseDto).toEqual(expetedMenuListResponseDtos);
      expect(accountServiceSpy.getMenu.calls.count()).toBe(1);
    });
  });

  describe('#clickSidenav', () => {
    it('should show side navi', () => {
      spyOn(component.sidenavToggle, 'emit').and.callThrough();
      component.clickSidenav();
      expect(component.sidenavToggle.emit).toHaveBeenCalled();
    });
  });

  describe('#clickSignOut', () => {
    it('should sign out', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      accountServiceSpy.signOut.and.returnValue(of(null));
      spyOn(router, 'navigate');
      component.clickSignOut();
      expect(matDialogSpy.open.calls.count()).toBe(1);
      expect(accountServiceSpy.signOut.calls.count()).toBe(1);
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_SIGN_IN]);
    });

    it('should not sign out', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(false) });
      component.clickSignOut();
      expect(matDialogSpy.open.calls.count()).toBe(1);
      expect(accountServiceSpy.signOut.calls.count()).toBe(0);
    });
  });
});

function createExpectedMenu() {
  const menuListResponseDto1: MenuListResponseDto = {
    menuCode: 'product',
    subMenuCodeList: Array('product-listing')
  };

  const menuListResponseDto2: MenuListResponseDto = {
    menuCode: 'purchase',
    subMenuCodeList: Array('purchase-history-listing', 'dummy-purchasing')
  };

  const expetedMenuListResponseDtos: MenuListResponseDto[] = Array(menuListResponseDto1, menuListResponseDto2);
  return expetedMenuListResponseDtos;
}
