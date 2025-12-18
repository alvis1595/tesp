import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GetChangesService } from '../services/get-changes.service';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export const cmdbCatalogoGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const message = inject(NzMessageService);
  const accessService = inject(GetChangesService);
  const userRolstring = sessionStorage.getItem('froles')??""
  const userRol = JSON.parse(userRolstring);
  const app = "cmdb_atr_manual";
  let hasAccess = false

  if (userRol != null && userRol.length > 1) {
    try {
      const response = await firstValueFrom(accessService.checkAccess(userRol, app));
      const access = response.flat()

      if (access.includes(app)) {
        hasAccess = true;
      } else {
        hasAccess = false;
      }
    } catch (error: any) {
      message.error(error.error.details)
      hasAccess = false;
      router.navigateByUrl('/homePage');
    }
  } else {
    router.navigateByUrl('/homePage');
  }

  return hasAccess;
};
