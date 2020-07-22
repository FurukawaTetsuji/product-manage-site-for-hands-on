import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule, CoreModule, NgxTranslateModule],
  exports: [SidenavComponent, HeaderComponent, FooterComponent]
})
export class SharedModule {}
