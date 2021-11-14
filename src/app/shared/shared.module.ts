import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material.module';
import { AppTableComponent } from './app-table/app-table.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    AppMaterialModule, CommonModule
  ],
  exports: [AppMaterialModule, AppTableComponent, CommonModule],
  declarations: [AppTableComponent],
  providers: []
})

export class SharedModule {
}
