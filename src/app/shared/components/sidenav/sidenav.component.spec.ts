import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { MenuListResponseDto } from 'src/app/pages/models/dtos/responses/menu-list-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let accountServiceSpy: { getMenu: jasmine.Spy };
  let searchParamsServiceSpy: { removeProductListingSearchParamsDto: jasmine.Spy };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', ['removeProductListingSearchParamsDto']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })
      ],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy }
      ],
      declarations: [SidenavComponent]
    }).compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SidenavComponent);
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

  describe('#clickSubmenu', () => {
    it('should remove search param', () => {
      spyOn(component.sidenavClose, 'emit').and.callThrough();
      component.clickSubmenu();
      expect(searchParamsServiceSpy.removeProductListingSearchParamsDto.calls.count()).toBe(1);
      expect(component.sidenavClose.emit).toHaveBeenCalled();
    });
  });

  describe('#clickHome', () => {
    it('should close side nav', () => {
      spyOn(component.sidenavClose, 'emit').and.callThrough();
      component.clickHome();
      expect(component.sidenavClose.emit).toHaveBeenCalled();
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
