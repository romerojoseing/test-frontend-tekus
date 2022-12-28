import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [BaseComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ]
})
export class LayoutModule { }
