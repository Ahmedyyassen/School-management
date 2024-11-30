import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { RouterModule } from '@angular/router';

const components = [CoreComponent]
const modules = [CommonModule,CoreRoutingModule,RouterModule]

@NgModule({
  declarations: components,
  imports: modules
})
export class CoreModule {  }
