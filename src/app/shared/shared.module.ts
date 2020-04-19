import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
