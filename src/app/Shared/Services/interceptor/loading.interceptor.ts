import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  spinner.busy();
  return next(req).pipe(
    finalize(()=> spinner.idel())
  );
};
