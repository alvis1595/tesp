import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GetChangesService } from '../services/get-changes.service';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export const administracionGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const message = inject(NzMessageService)
  const accessService = inject(GetChangesService)
  const userRolstring = sessionStorage.getItem('froles')??""
  const userRol = JSON.parse(userRolstring);
  const app = "administracion";
  let hasAccess = false

  if (userRol != null && userRol.length > 1) {
    try {
      const response = await firstValueFrom(accessService.checkAccess(userRol, app));
      const access = response.flat()
      console.log("ACCES: ", access);


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
