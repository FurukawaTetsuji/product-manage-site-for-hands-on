import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMessagingComponent } from './components/error-messaging/error-messaging.component';



@NgModule({
  declarations: [LoadingComponent, ErrorMessagingComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
