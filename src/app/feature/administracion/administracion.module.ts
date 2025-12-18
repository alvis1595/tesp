import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapaComponent } from './pages/capa/capa.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CmdbComponent } from './pages/cmdb/cmdb.component';

const routes: Routes = [
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'capa',
    component: CapaComponent,
  },
  {
    path: 'cmdb',
    component: CmdbComponent,
  },
  {
    path: '**',
    redirectTo: 'capa'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionModule { }
