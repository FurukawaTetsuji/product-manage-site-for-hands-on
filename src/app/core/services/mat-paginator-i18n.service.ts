import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

const ITEMS_PER_PAGE = 'Items per page:';
const NEXT_PAGE = 'Next page';
const PREV_PAGE = 'Previous page';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorI18nService extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe((e: Event) => {
      this.setupLabels();
    });

    this.setupLabels();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} / ${length}`;
  };

  private setupLabels(): void {
    this.itemsPerPageLabel = this.translate.instant(ITEMS_PER_PAGE);
    this.nextPageLabel = this.translate.instant(NEXT_PAGE);
    this.previousPageLabel = this.translate.instant(PREV_PAGE);
  }
}
