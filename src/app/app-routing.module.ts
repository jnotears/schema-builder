import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/module-schema' },
  { path: 'module-schema', loadComponent: () => import('./pages/module-schema/module-schema.component').then(c => c.ModuleSchemaComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
