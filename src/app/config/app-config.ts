import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfig {

  get(config: string)
  {
    var result: string;

    switch(config) {
      case "host": {
        result = environment.host;
        break;
      }
    }
    return result;
  }
}
