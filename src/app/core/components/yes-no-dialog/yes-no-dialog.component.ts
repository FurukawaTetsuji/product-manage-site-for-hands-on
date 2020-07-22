import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogData } from '../../models/yes-no-dialog-data';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
  constructor(public translateService: TranslateService, @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) {}

  ngOnInit(): void {}
}
