import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCRQTrackingComponent } from './pages/listado-crqtracking/listado-crqtracking.component';

const routes: Routes = [
  {
    path: 'listadoDeCambios',
    component: ListadoCRQTrackingComponent,
  },
  {
    path: '**',
    redirectTo: 'listadoDeCambios'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaseExpressModule { }
