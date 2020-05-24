import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UrlConst } from '../../constants/url-const';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../../models/dtos/responses/sign-in-response-dto';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, AfterViewChecked {
  signInUserAccount = new FormControl('', [Validators.required]);
  signInUserPassword = new FormControl('', [Validators.required]);

  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword
  });

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private routingService: RoutingService,
    private loadingService: LoadingService,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    // Sets language from browser settings.
    this.setupLangage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked() {
    this.titleI18Service.setTitle(UrlConst.PATH_SIGN_IN);
  }

  /**
   * Clicks sign in button
   */
  clickSignInButton() {
    // Creates request dto.
    const signInRequestDto = this.createSignInRequestDto();

    // Signs in using dto.
    this.signIn(signInRequestDto);
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLangage() {
    // Setups language using browser settings.
    this.translateService.setDefaultLang(this.getLangage(navigator.language));
    this.translateService.use(this.getLangage(navigator.language));
  }

  private getLangage(language: string): string {
    console.log('SignInPageComponent #getLangage() language:' + language);

    const CHAR_HYPHEN = '-';
    if (language.indexOf(CHAR_HYPHEN) > 0) {
      const splittedLanguage: string[] = language.split(CHAR_HYPHEN);
      console.log('SignInPageComponent #getLangage() splittedLanguage[0]:' + splittedLanguage[0]);

      return splittedLanguage[0];
    }
    return language;
  }

  private signIn(signInRequestDto: SignInRequestDto) {
    // Starts Loading.
    this.loadingService.startLoading();
    // Signs in and gets response dto.
    const signInResponseDto: Observable<SignInResponseDto> = this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((responseDto) => {
      if (responseDto != null) {
        // Sets account information.
        this.setUpUserAccount(responseDto);
        // Moves to the Product listing page.
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);
      }
      // Stops Loading.
      this.loadingService.stopLoading();
    });
  }

  private createSignInRequestDto(): SignInRequestDto {
    // Creates Request dto.
    const signInRequestDto = new SignInRequestDto();
    signInRequestDto.Username = this.signInUserAccount.value;
    signInRequestDto.Password = this.signInUserPassword.value;
    return signInRequestDto;
  }

  private setUpUserAccount(responseDto: SignInResponseDto) {
    const user: User = new User();
    user.userAccount = responseDto.userAccount;
    user.userName = responseDto.userName;
    user.userLocale = responseDto.userLocale;
    user.userLanguage = responseDto.userLanguage;
    user.userTimezone = responseDto.userTimezone;
    user.userTimezoneOffset = responseDto.userTimezoneOffset;
    user.userCurrency = responseDto.userCurrency;
    this.accountService.setUser(user);

    console.log('SignInPageComponent #setUpUserAccount() user.userAccount:' + user.userAccount);
    console.log('SignInPageComponent #setUpUserAccount() user.userName:' + user.userName);
    console.log('SignInPageComponent #setUpUserAccount() user.userLocale:' + user.userLocale);
    console.log('SignInPageComponent #setUpUserAccount() user.userLanguage:' + user.userLanguage);
    console.log('SignInPageComponent #setUpUserAccount() user.userTimezone:' + user.userTimezone);
    console.log('SignInPageComponent #setUpUserAccount() user.userTimezoneOffset:' + user.userTimezoneOffset);
    console.log('SignInPageComponent #setUpUserAccount() user.userCurrency:' + user.userCurrency);
  }
}
