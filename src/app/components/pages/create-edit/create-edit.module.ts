/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/* ---------- Components ---------- */
import { CreateEditComponent } from './create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEditComponent
  },
]

@NgModule({
  declarations: [
    CreateEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateEditModule { }
