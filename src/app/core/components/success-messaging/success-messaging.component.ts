import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SuccessMessagingService } from '../../services/success-messaging.service';

@Component({
  selector: 'app-success-messaging',
  templateUrl: './success-messaging.component.html',
  styleUrls: ['./success-messaging.component.scss']
})
export class SuccessMessagingComponent implements OnInit {
  constructor(public translateService: TranslateService, public successMessagingService: SuccessMessagingService) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.successMessagingService.clearMessageProperty();
  }
}
