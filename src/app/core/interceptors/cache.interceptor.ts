import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const cacheInterceptor: HttpInterceptorFn = (req, next) => {

  const cacheableUrls = ['/api/queryData', '/api/postWithBody'];


  return next(req);
};
