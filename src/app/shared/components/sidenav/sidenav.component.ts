import { RoutingService } from 'src/app/core/services/routing.service';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { MenuListResponseDto } from 'src/app/pages/models/dtos/responses/menu-list-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // Clicks sidenav and throw event
  @Output() sidenavClose = new EventEmitter();

  // Initial display screen URL
  initialDisplayScreenUrl: string = UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING;

  // Menu response data
  menuListResponseDto: MenuListResponseDto[];

  constructor(
    private accountService: AccountService,
    public routingService: RoutingService,
    private searchParamsService: SearchParamsService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.getMenu();
    // }
  }

  /**
   * Clicks submenu
   */
  clickSubmenu(): void {
    this.searchParamsService.removeProductListingSearchParamsDto();
    this.sidenavClose.emit();
  }

  /**
   * Clicks home
   */
  public clickHome(): void {
    this.sidenavClose.emit();
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private getMenu(): void {
    this.accountService.getMenu().subscribe((menuListResponseDto) => {
      this.menuListResponseDto = menuListResponseDto;
    });
  }
}
