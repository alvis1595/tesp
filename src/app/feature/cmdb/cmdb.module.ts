import { cmdbReporteGuard } from './../../core/guards/cmdb-reporte.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtributosManualesComponent } from './pages/atributos-manuales/atributos-manuales.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { cmdbCatalogoGuard } from '../../core/guards/cmdb-catalog.guard';

const routes: Routes = [
  {
    path: 'atributos-manuales',
    canActivate: [cmdbCatalogoGuard],
    component: AtributosManualesComponent,
  },
  {
    path: 'reporte',
    canActivate: [cmdbReporteGuard],
    component: ReporteComponent,
  },
  {
    path: '**',
    redirectTo: 'todos'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmdbModule { }
