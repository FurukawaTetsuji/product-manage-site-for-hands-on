import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { SessionStrageService } from 'src/app/core/services/session-strage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { AppConst } from '../constants/app-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../models/dtos/responses/sign-in-response-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private errorMessageService: ErrorMessagingService) {}

  /**
   * Signs in
   * @param signInRequestDto sign in request
   * @returns sign in response
   */
  signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(signInRequestDto.Username + ':' + signInRequestDto.Password)
    });

    return this.http
      .post<SignInResponseDto>(webApiUrl, signInRequestDto, { headers })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as SignInResponseDto);
        })
      );
  }

  /**
   * Gets user
   * @returns user informations from session strage
   */
  getUser(): User {
    return SessionStrageService.getItem(AppConst.STRAGE_KEY_USER, new User());
  }

  /**
   * Sets user
   * @param user infomatios to save session strage
   */
  setUser(user: User): void {
    SessionStrageService.setItem(AppConst.STRAGE_KEY_USER, user);
  }

  /**
   * Removes user
   */
  removeUser(): void {
    SessionStrageService.removeItem(AppConst.STRAGE_KEY_USER);
  }
}
