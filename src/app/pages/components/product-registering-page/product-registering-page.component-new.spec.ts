import { Buffer } from 'buffer';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/testing/html-element-utility';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { UrlConst } from '../../constants/url-const';
import { ProductDto } from '../../models/dtos/product-dto';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import { ProductRegisteringPageComponent } from './product-registering-page.component';

/** Frequently used values */
const VALUE_PRODUCT_CODE_UPPER = 'PRODUCTCODE';
const VALUE_PRODUCT_CODE_LOWER = 'productcode';
const VALUE_PRODUCT_NAME = 'productName';
const VALUE_PRODUCT_GENRE = '1';
const VALUE_PRODUCT_GENRE_NAME = '靴・スニーカー';
const VALUE_PRODUCT_COLOR = 'productColor';
const VALUE_PRODUCT_SIZE_STANDARD = 'productSizeStandard';
const VALUE_PRODUCT_UNIT_PRICE = 1000;
const VALUE_PRODUCT_UNIT_PRICE_FORMATED = '1,000';
const VALUE_PRODUCT_IMAGE_BASE64 =
  // tslint:disable-next-line: max-line-length
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAgICAsICAsQCwkLEBMOCwsOExYSEhMSEhYVERMSEhMRFRUZGhsaGRUhISQkISEwLy8vMDY2NjY2NjY2Njb/2wBDAQwLCwwNDA8NDQ8TDg4OExQODw8OFBoSEhQSEhoiGBUVFRUYIh4gGxsbIB4lJSIiJSUvLywvLzY2NjY2NjY2Njb/wAARCAEoAYsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZNKkEUk0mdkal2wMnCjJwB16VX1TUrbR9Pn1O83fZ7dd8mwZbGQAAMjua808UfEc6nbi30LfHaSDEshwsrk5/d4BOxMD5m79BRcdjQuvizbTW06aVZP9vwwtxcECMnsWCkN+HH1q/o/xI0lrFBrcxhvkO2YiJgh4BEhA3bAc4wx6g9sV5hb2C3heW6YtPJ0kXgr6bfQD0796cdRn0VktrxfMjP8Aq5U43r/8UKV2PQ98sr+y1KAXVhOlxA3SSNgwz6HHQ+xqxXjVlJLpN0b3TZvsd0f9Zs+5IB2lj6MOfr713vh7xtZ6tKun36iz1M/cQnMU2MAmFz3/ANg8j360XFY6iiiimIKKqXOq6ZZZ+13cMJAyVeRQ3/fOc1zGq/E7w3pwZYGe8lHAEYCJn3eUrx/ug0AdlVe91Cx06Hz7+4jt4ugaRguTjOFB5J9hzXkGrfFvVrkMlgqWqngeUN7D6yyqM/hGtcLf6vf6lMZ7yd5ZSMF3YsxHoWYk49ulK47Hs2q/Fjw/YMY7OOS9cfxL+7T82Bb/AMdrA/4XLdNL8umxCL+6XbP/AH2B/wCy15ZmpLaJ7idIU/iPJ9AOpoux6H0d4Y8T2fiiya5tkaGaIhbi2cgshOcHI6qcHB9q268U+HOqra+M1tEOIbyF7c+hdB5qn81IFe10ITCiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKxfFPia28Laet/cwvOHkEaxx8ckE5JwcAYqh4w8bQeEzbRtbPcy3O7BB2ogXH3mweTngV5ZrviXU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gAooooAKKKKACiiigCje6Jo2pOJNQsLa6kAwHmiR2x6bmUnFZWoeAfCWpTPcXGnIs0nLvEWjyfXajBcnucc10dFAHDy/CTwlIWKC5jJ7LLwPoGU1Tf4N6AxBjvbpFHUZjOR6ZKV6JRRYd2eaN8GNML5TVLgJn7pRCcemeP5VC3wXh3HZrDBM8BrcE49yJQM49q9RoosF2eXn4L2+47dXbZ2BgBb8SJQP0qZPgzpo+/qc5+kaD+ZavSqKVkF2cDB8IfDsZBnuLmYDqNyJn/vlM1rW3w68I2ziT7AJSCCold2UY5xtzgj2INdRRTsF2U7PR9J05i9hY29s54LwxIjH6lVBq5RRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';
const VALUE_PRODUCT_IMAGE_DATA_URL =
  // tslint:disable-next-line: max-line-length
  'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAgICAsICAsQCwkLEBMOCwsOExYSEhMSEhYVERMSEhMRFRUZGhsaGRUhISQkISEwLy8vMDY2NjY2NjY2Njb/2wBDAQwLCwwNDA8NDQ8TDg4OExQODw8OFBoSEhQSEhoiGBUVFRUYIh4gGxsbIB4lJSIiJSUvLywvLzY2NjY2NjY2Njb/wAARCAEoAYsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZNKkEUk0mdkal2wMnCjJwB16VX1TUrbR9Pn1O83fZ7dd8mwZbGQAAMjua808UfEc6nbi30LfHaSDEshwsrk5/d4BOxMD5m79BRcdjQuvizbTW06aVZP9vwwtxcECMnsWCkN+HH1q/o/xI0lrFBrcxhvkO2YiJgh4BEhA3bAc4wx6g9sV5hb2C3heW6YtPJ0kXgr6bfQD0796cdRn0VktrxfMjP8Aq5U43r/8UKV2PQ98sr+y1KAXVhOlxA3SSNgwz6HHQ+xqxXjVlJLpN0b3TZvsd0f9Zs+5IB2lj6MOfr713vh7xtZ6tKun36iz1M/cQnMU2MAmFz3/ANg8j360XFY6iiiimIKKqXOq6ZZZ+13cMJAyVeRQ3/fOc1zGq/E7w3pwZYGe8lHAEYCJn3eUrx/ug0AdlVe91Cx06Hz7+4jt4ugaRguTjOFB5J9hzXkGrfFvVrkMlgqWqngeUN7D6yyqM/hGtcLf6vf6lMZ7yd5ZSMF3YsxHoWYk49ulK47Hs2q/Fjw/YMY7OOS9cfxL+7T82Bb/AMdrA/4XLdNL8umxCL+6XbP/AH2B/wCy15ZmpLaJ7idIU/iPJ9AOpoux6H0d4Y8T2fiiya5tkaGaIhbi2cgshOcHI6qcHB9q268U+HOqra+M1tEOIbyF7c+hdB5qn81IFe10ITCiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKxfFPia28Laet/cwvOHkEaxx8ckE5JwcAYqh4w8bQeEzbRtbPcy3O7BB2ogXH3mweTngV5ZrviXUNfuvOmkzG3+qQfcjX2U8Fz6nge5pNjsaXiTx1eeIsQ248iwbgW2Tz6tOwxu64CjrXOJpU87GWzYRv1O7hGPpgDA/AU6LT5UP2i2ALDrDJyr+vXkH3q3pupNcTS2zQPb+Uu7D545A2knqeeKQyG11GSO6j0+W3aCd8gpyRkDJZW5yvHrVu5uCq4PY5Gex9aW5uNvzA5YdD3rGubp3YjOaAHS3su7Jc5povJJUMUgDq3KgjOCOjKexHY1UILc0BxGKBG1NrniCFY4odXuhOVAiBuplVsfwH94F3ehOPT0rIuPEGuTM0d5dzyMOGSeSSTH1WVmH6VUlcyH5jkUpmSRRHeKXVRhJl/1qD0yfvL7H8CKYEb3dzINrSEL/AHV+VfyXAqHNSyWzKC8LCeMfxJ94f76H5l+vT3qAnNFh3HZpM+lJUsFrcXOWjXbGPvTP8qD/AIEe/sKBEY3MwRAWdjhVHUmtXauk25jJDX8w+fHPlqe31qNJ7XTVIsv392Rhrph8q/8AXNT/ADNUmZnYu5LMxyWPU0AaWh3/APZer2GonOLa4ilf/cVwX/Nc19NV8rLzwelfS/h28/tDQdOvM7mlt4i5/wBraA36g0IHsaVFFFMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXGeLvH0Xh67GlwW5lu3j3iZjiNSSQAODuII5Han+KfHNnpCz2VuGa+UbQTwpJA+63OeTgkDgg15PNNdavNI9ziSRzlz/cXsFz0z7UmxpDNQ1S91K5kuLqQyTSZMkh5Cg/wID09z17D1ptrZTojXUChwBlrYj7477fQ+lNuLaSyh3yI0kH8Ei8svs47j3rR06Uy2aTkbc5wOnAOM/jikMZpt1JeRSO6GMRNsG4YJ4z0PpS3Mz4GT06VJPPznuKyrqfOQDyaAI57lySAfrVYEvwOnc01iXO0HjvViCMd+lMCVIQYiT0qjMCD6VeluBGu0HgdqzZZS5JoAhJ5pppSaSgBOQQVOD6inmeQ/ew3+8Af5im0YoEOEhHREH/AAEUPJJJjexIHQdh9BTcUUAFFFFADlPNfQXw3n87wfYD/nl5kf8A3y7f418+p1r3j4WZHhRFP8M8oH6H+tHUb2OzooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRUc9xBbIZJ3CKBkkmgCSuD8beOE06N9P0uQG66PIOcey/1NUvGHxEihjey0x/nOQXHX9K8uaee7naWUlnY5JpXGkWLm6vNQuTcXkxmmfGWc5x6Aewq5a77KQrOCEbAzjj25/l2PY8Goba0LDLCtaFQYhBdAtGOEdeHUegJBBHsQRSGJI7BSFOUNVXuFiTHQDtTp4ZrVS6nzYO7rn5egG4EnaPrwPXtWTcSiXpwe696AJZ7xT0NUC5Yls1G6E5oUHaaALNpEX579asSjygfXvT7TYsee+P8iqt5cBmIBoAqTSEmq/NT7Gk5VSfU9vz6U0oB95gPYHd/Lj9aAIaO1PxGDyCfqcfoKaWXsAP8+9ABxRmkzRmmAppKKSgApaOKM0CJYVG4E9K97+GkJi8KQMR/rZZZB9C20f+g14JAsk0sdvCpeaV1SNBySzEAAD1JNfTWiacukaRZ6avP2aJUY+rYyx/FiaFuN7F6iiimSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFMllihUvM6oo7sQB+tc/qHjrw3p5KSXiM46hTn+WaAOjorz27+KWmAH7Mxb0wuP1asC8+Js8pPkq3sSaVx2PXZLmCIZeQD8aoXGvWMGRv5/vdQPfGQTXi9z431G4J+bH0rMn169lzulbB7ZpXY7I9M1T4gX2nTNBNBE8T/wCouoCQpP8AdYOWINcFrvi/U9TcqZCif3cmsNr13BDElT1BpgUTcZ56ZoAjAaV+eWPc1r2Np0OPxqG1s2HbNbtnCVAGMGgCWC3A7VI6YHSrCpgZFQTng0AZlw7xNvjbaw7is+d7SYbbiLYw6SRYB+pU5B/DFWrs9cVkTlsmgAeJFwIZg4/2sr+h3Y/76ojt55CSihsckLz+HGagVSW561q6dmCXzOx4IoArfYr9x/qdoPPzHGP/AB5c1BLbXMZy4RPTaBn+v866G4mLegHf/wCtWRdtnIoAzHU/xktjpuOaiYn/APVU0r9h0qBmBoAaRSUuaTNAB0ozRTvLY9BQA08UmaewVVBY03r90fjTATmlA7mjB7mlAApAWtNuZLO+huYWaN0YYkThwDwdhPQ4J5r6a06Y3Gn2k56ywxuf+BKD/WvmCPll+or6b0b/AJA+n/8AXtD/AOi1prcT2LtFFFMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXO+LvFSeHLQJboLjVLgH7NAxwoA4MspHIQH8SeB3I6KvDPFWsNqOs3Vxn5d2xf91eFX8B+vPek2NGLrOp6/qVz5t/qMtxNJ/CpKRqP7qIuFA/Cq0XhzU5gHVPvepp4ctOjDkg101rfypEHZcLj8KQzlpfD2qwdYifpzVdtOvU+/E35V2n/CRWinazDI6g04axp0v3iKAOG+yzjqh/KgW8x42mu8F1prrhguPwpCNMc5G0H0oA4kWcuPumpI7aZGDqDkeldn5Nkx+XGKaba37AYNAGZpbJI4hcAFlLRN/ex1U+4/xrYWNVA9qxr6EWMqTxnC53oeeGXO5cD1DZH0b1rRN/G8auD1HSgCZnwMiqNxN2zTJ7sYyDxWbLd5yKAHXDA5Gaz5I8/wCNStJ75zRwwzQBAsXI4xWlbICAO1VkG5uOtWWkECZwB9aAHzypGpPasK5uSWO2n3t80p2joKzySTk0AIzFjzSUppQnGW4FADQCeBTsKv3jz6CniNmXd9xOxPU/QUhCR8j8zQAm/wDupj3NIS56tx7Vp3Wga5ZWS6le6fPb2LnCzyRlRz03A/MoPYsAD2rNZe45HrQAg2ryACfU8/zoJY9aAM07aelMBtAGafsFX9L0TVtZkEek2ct0c4Lxr+7Xr9+Q4Renc0gKcYCspPQEE19QWcXkWkEI6Rxon/fKgf0rzTwr8J3guItQ8SyI/lEPHYRHcpYHI858DI4+6OD3PavUaaEwooopiCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAxfF2sS6HoVzfW+37TgJBu5AZv4iB12qC2Pavn+S7MjsJT+9ydxPc+vbrXrvxYnkj0WzjUEI9zuMnYMqMAh/3gxP4V43PEsmMYRv73r9TUvca2EkuHiORU3/CQXYi8naCvb2qlLFcQgGRCYz0fqp+h6VGqo3QjNMBXnaQlm6mmiRh0OKcYTR5NACx3EqdHPNSrfTKchjUHktSGJqANBNVuF43VOmtXHQtWQVakwwoGb41KW7jaAnJ6r9RzVA6hKjYU8Ht6e1UUeSNg6HDDoaGJbk9aANJL6SThj1pDJngnms0FhS739aANJZVXqc1J9pQCsrc1HNIDT+2onI61WnvJJeM1VwaXaaAEyScmjBPApwQ9+BTgP7vA9T/AEoAaFwcY3OegFShVj+Z8O/Yfwj/ABNKiOzLDAjSSyHaiICzuT0UAZJ+gr1Lwb8LQvl6n4pQO33otM6qvoZyOGP+yOPXPSgPU47w14J1zxUyzwL9m08nD38wO0gcHyk4MhHtge4r2Dw74G8P+HFWS2gE96Ot7Ph5M9ynGE/4CK6JESNFjjUJGgCoijAAHAAA4AApaaQmxHRJEaORQyMCrKwyCDwQQeoNeXeMfhahEmqeFkCP96bTOisOpNuex/2Dwe2Oh9SopiufNuneHNb1eQx6dp80uGKO2wqqsDghnfCjB4PNdfo3wi1a6Ik1q5SxiB5hixLKR/vA7Fz/AMC+lexgAdOKKVh3OU0n4b+FNJfzRam8l7PdnzQMeiYCf+O11SqqKEQBVUYVRwABwAAKWimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKeq6VY61YS6bqMfm20www6EEcqykchgeQa8Y8S/DzXdCZ5rONtS00ciWJczIPSSJck47suR64r3Oiiw7nyysjJnynKc8gHAz7imsd5zIin3Ubf/AEHA/SvozWPB3hvXS0mo2EbTt1uI8xy59S8ZUn8c1w+p/BoZL6LqRA7Q3i5/8ixAf+gH60gPKdg/hYr7UfvgeGBHvXZXnwv8X2pPl28d0o43QyLz9FfYf0rA1Hw54g0kBtR0+eFCMhyhKAe7puUfiaBmb5kg6qD9KPOH8SkUgY88dOtAkBGe1IB3mxHrkUu6E/xUzKntS/J1xzQA790f4hTWCdiKNsfoKXbF3UH8/wDGgBR5RHUUYi/vCgLD/cH5n/GgCLsg/X/GgA/df3hQGhHv9KcGVeij8hS+YcYBwPbj+VACbsj5Iyfc8Uh3nqQv05/lT8PIyqAzu52oOSWJ6BR1J+lbOneDvE+qYNppswQ/8tJV8lfzl2/pQFjDwg5AJPq39BVvTdL1LWboWmlW0l1cHGQg+VQeN0jn5UX3YivSNE+D/wAyT+ILzKjBNpa5Gehw8zduxCr9DXo+m6Tpuj2/2XS7WO1h6lYxjJ9WPVj7k0WC6Oa8E+AbTwwn228K3WsSDDTY+SIHqkIPP1bqfYV2NFFUS3cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCje6Jo2pOJNQsLa6kAwHmiR2x6bmUnFZWoeAfCWpTPcXGnIs0nLvEWjyfXajBcnucc10dFAHDy/CTwlIWKC5jJ7LLwPoGU1Tf4N6AxBjvbpFHUZjOR6ZKV6JRRYd2eaN8GNML5TVLgJn7pRCcemeP5VC3wXh3HZrDBM8BrcE49yJQM49q9RoosF2eXn4L2+47dXbZ2BgBb8SJQP0qZPgzpo+/qc5+kaD+ZavSqKVkF2cDB8IfDsZBnuLmYDqNyJn/vlM1rW3w68I2ziT7AJSCCold2UY5xtzgj2INdRRTsF2U7PR9J05i9hY29s54LwxIjH6lVBq5RRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';
const VALUE_NOT_PRODUCT_IMAGE_BASE64 = '/9j/4QAYRXh';

describe('ProductRegisteringPageComponent_new', () => {
  const IDS = {
    TITLE: '#title',
    PRODUCT_CODE: '#product-code',
    PRODUCT_NAME: '#product-name',
    PRODUCT_GENRE: '#product-genre',
    PRODUCT_GENRE_LABEL: '#product-genre-label',
    PRODUCT_SIZE_STANDARD: '#product-size-standard',
    PRODUCT_COLOR: '#product-color',
    PRODUCT_UNIT_PRICE: '#product-unit-price',
    SAVE_BUTTON: '#save-button',
    END_OF_SALE: '#end-of-sale',
    END_OF_SALE_LABEL: '#end-of-sale label',
    END_OF_SALE_INPUT: '#end-of-sale-input',
    END_OF_SALE_DATE: '#end-of-sale-date',
    PRODUCT_IMAGE: '#product-image'
  };
  const SLASH_NEW = '/new';
  const expectedUser: User = createExpectedUser();
  const expectedGenres = createExpectedGenres();
  const expectedProductDto: ProductDto = createExpectedProductDto();

  let component: ProductRegisteringPageComponent;
  let fixture: ComponentFixture<ProductRegisteringPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: {
    getGenres: jasmine.Spy;
    getProduct: jasmine.Spy;
    createProduct: jasmine.Spy;
    updateProduct: jasmine.Spy;
  };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getGenres',
      'getProduct',
      'createProduct',
      'updateProduct'
    ]);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxUpperCaseDirectiveModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        FormattedCurrencyPipe,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        {
          provide: Router,
          useValue: { url: UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING + SLASH_NEW, navigate(): void {} }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: null } }
        }
      ],
      declarations: [ProductRegisteringPageComponent]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(expectedUser);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    productServiceSpy.getProduct.and.returnValue(of(expectedProductDto));
    fixture = TestBed.createComponent(ProductRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init screen', () => {
      expect(productServiceSpy.getGenres.calls.count()).toEqual(1);
      expect(component.genres).toEqual(expectedGenres);
      expect(productServiceSpy.getProduct.calls.count()).toEqual(0);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickProductImageButton', () => {
    const privateMethodReadFile = 'readFile';

    it('should return When there is no file', () => {
      spyOn<any>(component, privateMethodReadFile).and.callThrough();
      component.clickProductImageButton(Array());
      expect(component[privateMethodReadFile]).toHaveBeenCalledTimes(0);
    });
    it('should return when not images', () => {
      // Setups non image file.
      const decodedImage = Buffer.from(VALUE_NOT_PRODUCT_IMAGE_BASE64, 'base64');
      const arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(new Blob([decodedImage]));
      const imageFiles = Array(new File(arrayOfBlob, 'test01.zip', { type: 'application/zip' }));

      spyOn<any>(component, privateMethodReadFile).and.callThrough();
      component.clickProductImageButton(imageFiles);

      expect(imageFiles.length).toEqual(1);
      expect(component[privateMethodReadFile]).toHaveBeenCalledTimes(0);
    });
    it('should load image', () => {
      // Setups image file.
      const decodedImage = Buffer.from(VALUE_PRODUCT_IMAGE_BASE64, 'base64');
      const arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(new Blob([decodedImage]));
      const imageFiles = Array(new File(arrayOfBlob, 'test01.img', { type: 'image/png' }));

      spyOn<any>(component, privateMethodReadFile).and.returnValue(of(VALUE_PRODUCT_IMAGE_DATA_URL));
      component.clickProductImageButton(imageFiles);

      expect(imageFiles.length).toEqual(1);
      expect(component[privateMethodReadFile]).toHaveBeenCalledWith(imageFiles[0]);
      expect(component.productImage.value).toEqual(VALUE_PRODUCT_IMAGE_DATA_URL);
    });
  });
  describe('#readFile', () => {
    it('should load image', () => {
      // Setups image file.
      const decodedImage = Buffer.from(VALUE_PRODUCT_IMAGE_BASE64, 'base64');
      const arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(new Blob([decodedImage]));
      const imageFiles = Array(new File(arrayOfBlob, 'test01.img', { type: 'image/png' }));

      expect(imageFiles.length).toEqual(1);
      const privateMethodName = 'readFile';
      component[privateMethodName](imageFiles[0]).subscribe((result) => {
        expect(result).toEqual(VALUE_PRODUCT_IMAGE_DATA_URL);
      });
    });
  });

  describe('#clickClearButton', () => {
    it('should clear', () => {
      component.productImage.setValue(VALUE_PRODUCT_IMAGE_DATA_URL);
      component.clickClearButton();
      expect(component.productImage.value).toBeNull();
    });
  });

  describe('#clickReturnButton', () => {
    it('should return', () => {
      spyOn(router, 'navigate').and.callThrough();
      component.clickReturnButton();
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.PATH_PRODUCT_LISTING]);
    });
  });

  describe('#clickSaveButton', () => {
    const privateMethodExtractResponse = 'extractGetProductResponse';

    beforeEach(() => {
      spyOn<any>(component, privateMethodExtractResponse).and.callThrough();
    });

    it('should not create data', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(false) });
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(0);
      expect(productServiceSpy.updateProduct.calls.count()).toEqual(0);
      expect(component[privateMethodExtractResponse]).toHaveBeenCalledTimes(0);
    });
    it('should create data', async () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.createProduct.and.returnValue(of(expectedProductDto));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(1);
      expect(productServiceSpy.updateProduct.calls.count()).toEqual(0);
      expect(component[privateMethodExtractResponse]).toHaveBeenCalledOnceWith(expectedProductDto);
      expect(component.productSeq.value).toEqual(expectedProductDto.productSeq);
      expect(component.productCode.value).toEqual(expectedProductDto.productCode);
      expect(component.productName.value).toEqual(expectedProductDto.productName);
      expect(component.productGenre.value).toEqual(expectedProductDto.productGenre);
      expect(component.productSizeStandard.value).toEqual(expectedProductDto.productSizeStandard);
      expect(component.productColor.value).toEqual(expectedProductDto.productColor);
      expect(component.productUnitPrice.value).toEqual(VALUE_PRODUCT_UNIT_PRICE_FORMATED);
      expect(component.endOfSale.value).toEqual(expectedProductDto.endOfSale);
      expect(component.endOfSaleDate.value).toEqual(expectedProductDto.endOfSaleDate);
      expect(component.productImage.value).toEqual(expectedProductDto.productImage);
      expect(component.updateDate.value).toEqual(expectedProductDto.updateDate);
    });
    it('should create data but response is null', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.createProduct.and.returnValue(of(null));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(1);
      expect(productServiceSpy.updateProduct.calls.count()).toEqual(0);
      expect(component[privateMethodExtractResponse]).toHaveBeenCalledOnceWith(null);
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.TITLE)).nativeElement;
      expect(htmlElement.innerText).toEqual('商品登録');
    });

    it('product code', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_CODE)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品コード');
    });
    it('product name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_NAME)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品名');
    });
    it('product genre', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_GENRE_LABEL)).nativeElement;
      expect(htmlElement.innerText).toContain('ジャンル');
    });
    it('product size standard', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_SIZE_STANDARD)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('サイズ・規格');
    });
    it('product color', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_COLOR)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('色');
    });
    it('product unit price', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_UNIT_PRICE)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('単価');
    });
    it('product end of sale', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.END_OF_SALE)).nativeElement;
      expect(htmlElement.innerText).toContain('販売終了');
    });
    it('product end of sale date', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.END_OF_SALE_LABEL)).nativeElement;
      // Clicks checkbox's label
      htmlElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const htmlElementEndOfSaleDate: HTMLInputElement = fixture.debugElement.query(
          By.css(IDS.END_OF_SALE_DATE)
        ).nativeElement;
        expect(htmlElementEndOfSaleDate.placeholder).toContain('販売終了日');
      });
      expect(component.endOfSale.value).toBeTruthy();
    });

    it('saveBtn', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.SAVE_BUTTON)).nativeElement;
      expect(htmlElement.innerText).toEqual('登録');
    });
  });

  describe('DOM input test', () => {
    it('product code', () => {
      const expectedValue = VALUE_PRODUCT_CODE_UPPER;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_CODE,
        VALUE_PRODUCT_CODE_LOWER
      );
      expect(component.productCode.value).toEqual(expectedValue);
    });
    it('product name', () => {
      const expectedValue = VALUE_PRODUCT_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_NAME, expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product genre', () => {
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, IDS.PRODUCT_GENRE, 0);
      expect(component.productGenre.value).toEqual(VALUE_PRODUCT_GENRE);
    });
    it('product size standard', () => {
      const expectedValue = VALUE_PRODUCT_SIZE_STANDARD;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_SIZE_STANDARD,
        expectedValue
      );
      expect(component.productSizeStandard.value).toEqual(expectedValue);
    });
    it('product color', () => {
      const expectedValue = VALUE_PRODUCT_COLOR;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_COLOR, expectedValue);
      expect(component.productColor.value).toEqual(expectedValue);
    });
    it('product unit price', () => {
      const expectedValue = '12345';
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_UNIT_PRICE, expectedValue);
      expect(component.productUnitPrice.value).toEqual(expectedValue);
    });
    it('end of sale', () => {
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, IDS.END_OF_SALE_LABEL);
      expect(component.endOfSale.value).toEqual(true);
    });

    it('end of sale date', () => {
      const expectedValue = '2021/01/01';
      component.receivedEventFromChild(expectedValue);
      fixture.detectChanges();
      expect(component.endOfSaleDate.value).toEqual(expectedValue);
    });
  });

  describe('DOM input validation test', () => {
    const CLASSES = {
      VALIDATION_ERROR: '.validation-error'
    };
    it('should enter the correct value in the product code', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_CODE, 'PRODUCT_');
      const validationError: HTMLElement = fixture.debugElement.query(By.css(CLASSES.VALIDATION_ERROR)).nativeElement;
      expect(validationError).toBeTruthy();
    });
    it('should enter the correct value in the product name', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_NAME, '');
      const validationError: HTMLElement = fixture.debugElement.query(By.css(CLASSES.VALIDATION_ERROR)).nativeElement;
      expect(validationError).toBeTruthy();
    });
    it('should enter the correct value in the product size standard', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_SIZE_STANDARD, '');
      const validationError: HTMLElement = fixture.debugElement.query(By.css(CLASSES.VALIDATION_ERROR)).nativeElement;
      expect(validationError).toBeTruthy();
    });
    it('should enter the correct value in the product unit price', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_UNIT_PRICE, '');
      const validationError: HTMLElement = fixture.debugElement.query(By.css(CLASSES.VALIDATION_ERROR)).nativeElement;
      expect(validationError).toBeTruthy();
    });
    it('should enter the correct value both the end Of sale and end Of sale date', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_CODE,
        VALUE_PRODUCT_CODE_LOWER
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_NAME, VALUE_PRODUCT_NAME);
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, IDS.PRODUCT_GENRE, 0);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_SIZE_STANDARD,
        VALUE_PRODUCT_SIZE_STANDARD
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_UNIT_PRICE,
        VALUE_PRODUCT_UNIT_PRICE
      );
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, IDS.END_OF_SALE_LABEL);
      component.receivedEventFromChild(null);
      fixture.detectChanges();

      expect(component.registeringForm.valid).toBeFalsy();
    });
  });

  describe('DOM input/output test', () => {
    it('Should create product dto correctly', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_CODE,
        expectedProductDto.productCode
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_NAME,
        expectedProductDto.productName
      );
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(fixture, IDS.PRODUCT_GENRE, 0);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_SIZE_STANDARD,
        expectedProductDto.productSizeStandard
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_COLOR,
        expectedProductDto.productColor
      );
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_UNIT_PRICE,
        expectedProductDto.productUnitPrice.toString()
      );
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, IDS.END_OF_SALE_LABEL);
      component.receivedEventFromChild(expectedProductDto.endOfSaleDate.toString());
      fixture.detectChanges();

      const privateMethodName = 'createProductRegisterRequest';
      const productRequestDto: ProductDto = component[privateMethodName](true);

      expect(productRequestDto.productSeq).toBeNull();
      expect(productRequestDto.productName).toEqual(expectedProductDto.productName);
      expect(productRequestDto.productGenre).toEqual(VALUE_PRODUCT_GENRE);
      expect(productRequestDto.productSizeStandard).toEqual(expectedProductDto.productSizeStandard);
      expect(productRequestDto.productColor).toEqual(expectedProductDto.productColor);
      expect(productRequestDto.endOfSale).toBeTruthy();
      expect(productRequestDto.endOfSaleDate.toString()).toEqual(expectedProductDto.endOfSaleDate.toString());
      expect(productRequestDto.updateDate).toBeNull();
    });
    it('Should set correctly on the screen', () => {
      const privateMethodName = 'extractGetProductResponse';
      component[privateMethodName](expectedProductDto);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_CODE)).nativeElement.value).toEqual(
        expectedProductDto.productCode
      );
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_NAME)).nativeElement.value).toEqual(
        expectedProductDto.productName
      );
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_GENRE)).nativeElement.innerText).toContain(
        VALUE_PRODUCT_GENRE_NAME
      );
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_SIZE_STANDARD)).nativeElement.value).toEqual(
        expectedProductDto.productSizeStandard
      );
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_COLOR)).nativeElement.value).toEqual(
        expectedProductDto.productColor
      );
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_UNIT_PRICE)).nativeElement.value).toEqual(
        VALUE_PRODUCT_UNIT_PRICE_FORMATED
      );
      expect(fixture.debugElement.query(By.css(IDS.END_OF_SALE_INPUT)).nativeElement.value).toBeTruthy();
      expect(fixture.debugElement.query(By.css(IDS.PRODUCT_IMAGE)).nativeElement.src).toEqual(
        expectedProductDto.productImage
      );
    });
  });
});

function createExpectedUser(): User {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userName = 'userName';
  user.userLocale = 'ja-JP';
  user.userLanguage = 'ja';
  user.userTimezone = 'UTC';
  user.userTimezoneOffset = '+0900';
  user.userCurrency = 'JPY';
  return user;
}

function createExpectedGenres() {
  return Array('1', '2', '3');
}

function createExpectedProductDto() {
  const expectedProductDto: ProductDto = {
    productSeq: 1,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    productName: VALUE_PRODUCT_NAME,
    productGenre: VALUE_PRODUCT_GENRE,
    productImage: VALUE_PRODUCT_IMAGE_DATA_URL,
    productSizeStandard: VALUE_PRODUCT_SIZE_STANDARD,
    productColor: VALUE_PRODUCT_COLOR,
    productUnitPrice: VALUE_PRODUCT_UNIT_PRICE,
    endOfSale: true,
    endOfSaleDate: new Date(),
    updateDate: new Date()
  };
  return expectedProductDto;
}
