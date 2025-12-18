import { CmdbModule } from './feature/cmdb/cmdb.module';
import { Routes } from '@angular/router';
import { MainComponent } from './feature/main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { loginGuard } from './core/guards/login.guard';
import { paseExpressGuard } from './core/guards/pase-exporess.guard';
import { liberacionGuard } from './core/guards/liberaciones.guard';
import { administracionGuard } from './core/guards/administracion.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'crqs',
    canActivate: [loginGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/crqs/crqs.module').then((m) => m.CrqsModule),
  },
  {
    path: 'paseExpress',
    canActivate: [loginGuard, paseExpressGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/paseExpress/paseExpress.module').then(
        (m) => m.PaseExpressModule
      ),
  },
  {
    path: 'CRQTracking',
    canActivate: [loginGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/crqTracking/crqTracking.module').then(
        (m) => m.PaseExpressModule
      ),
  },
  {
    path: 'DespliegueCD',
    canActivate: [loginGuard, liberacionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/DespliegueCd/desplieguesCD.module').then(
        (m) => m.PaseExpressModule
      ),
  },
  {
    path: 'cmdb',
    canActivate: [loginGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/cmdb/cmdb.module').then((m) => m.CmdbModule),
  },
  {
    path: 'Administracion',
    canActivate: [loginGuard, administracionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./feature/administracion/administracion.module').then(
        (m) => m.AdministracionModule
      ),
  },
  {
    path: 'homePage',
    component: LayoutComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: '**',
        component: MainComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
