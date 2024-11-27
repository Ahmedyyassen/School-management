import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

const components = [CoreComponent]
const modules = [CommonModule,CoreRoutingModule]

@NgModule({
  declarations: components,
  imports: modules
})
export class CoreModule { }
