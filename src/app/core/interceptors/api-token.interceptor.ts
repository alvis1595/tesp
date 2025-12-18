import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'Authorization': `${environment.API_TOKEN}`
    }
  });
  return next(clonedRequest);
};





