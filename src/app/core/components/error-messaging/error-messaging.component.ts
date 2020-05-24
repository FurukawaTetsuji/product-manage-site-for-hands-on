import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ErrorMessagingService } from '../../services/error-messaging.service';

@Component({
  selector: 'app-error-messaging',
  templateUrl: './error-messaging.component.html',
  styleUrls: ['./error-messaging.component.scss']
})
export class ErrorMessagingComponent implements OnInit {
  constructor(public errorMessagingService: ErrorMessagingService, public translateService: TranslateService) {}

  ngOnInit(): void {
    this.errorMessagingService.clearMessageProperty();
  }
}
