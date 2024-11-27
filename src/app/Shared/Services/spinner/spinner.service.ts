import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  busyRequestCount = 0;
  constructor(private spinnerService : NgxSpinnerService) {}

    busy(){
      this.busyRequestCount++;
      this.spinnerService.show(undefined,
        {
          type: 'line-scale-pulse-out-rapid',
          color: '#fff',
          size: 'large',
          bdColor: 'rgba(0, 0, 0,0.8)',
          fullScreen: true
        }
      )
    }
    idel(){
      this.busyRequestCount--;
      if(this.busyRequestCount <= 0){
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
    }
   }

