import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
]

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class ListModule { }
