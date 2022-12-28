import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-frontend-tekus';

  constructor(
    public translate: TranslateService
  ) {

    if (localStorage.getItem('lang')) {
      let lang = localStorage.getItem('lang');
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang(lang!);
      localStorage.setItem('lang', lang!);
    } else {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
    }
  }
}
