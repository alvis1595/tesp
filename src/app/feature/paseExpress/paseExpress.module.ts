import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDeCambiosComponent } from './pages/listado-de-cambios/listado-de-cambios.component';

const routes: Routes = [
  {
    path: 'listadoDeCambios',
    component: ListadoDeCambiosComponent,
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
