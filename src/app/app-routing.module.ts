/* ---------- Modules ---------- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* ---------- Components ---------- */
import { BaseComponent } from 'src/app/components/layout/base/base.component';

/* ---------- Guard ---------- */
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'base',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('src/app/components/pages/list/list.module').then(
            (m) => m.ListModule
          ),
      },
      {
        path: 'create-edit',
        loadChildren: () =>
          import(
            'src/app/components/pages/create-edit/create-edit.module'
          ).then((m) => m.CreateEditModule),
      },
      {
        path: 'create-edit/:id',
        loadChildren: () =>
          import(
            'src/app/components/pages/create-edit/create-edit.module'
          ).then((m) => m.CreateEditModule),
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'base', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
