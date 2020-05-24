import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TitleI18Service {
  constructor(private translateService: TranslateService, public title: Title) {}

  /**
   * Sets title
   * @param screenName Name of screen
   */
  public setTitle(screenName: string) {
    const titleSystem = this.translateService.instant('title.system');
    const titleSub = this.translateService.instant('title.' + screenName);
    this.title.setTitle(titleSystem + titleSub);
  }
}
