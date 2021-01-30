import { Injectable } from '@angular/core';

const INTERVAL_TIME = 5000;

@Injectable({
  providedIn: 'root'
})
export class SuccessMessagingService {
  private messageProperty: string;

  constructor() {}

  /**
   * Gets message property
   * @returns message property
   */
  public getMessageProperty(): string {
    return this.messageProperty;
  }

  /**
   * Sets message property
   * @param message message property to set
   */
  public setMessageProperty(message: string): void {
    this.messageProperty = message;
    this.hideMessage();
  }

  /**
   * Clears message property
   */
  public clearMessageProperty(): void {
    this.messageProperty = '';
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private hideMessage(): void {
    setTimeout(() => {
      this.clearMessageProperty();
    }, INTERVAL_TIME);
  }
}
