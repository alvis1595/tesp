import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';
import { EmergenciaComponent } from './pages/emergencia/emergencia.component';
import { ProduccionComponent } from './pages/produccion/produccion.component';
import { ReporteProduccionComponent } from './pages/reporte-produccion/reporte-produccion.component';
import { ManifiestoComponent } from './pages/manifiesto/manifiesto.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'emergencia',
    component: EmergenciaComponent,
  },
  {
    path: 'produccion',
    component: ProduccionComponent,
  },
  {
    path: 'reporte-produccion',
    component: ReporteProduccionComponent,
  },
  {
    path: 'manifiesto',
    component: ManifiestoComponent,
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
export class CrqsModule { }
