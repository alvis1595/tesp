import { LiberacionComponent } from './pages/liberacion/liberacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Liberaciones',
    component: LiberacionComponent,
  },
  {
    path: '**',
    redirectTo: 'Liberaciones'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaseExpressModule { }
