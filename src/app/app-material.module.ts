import { NgModule } from '@angular/core';
import { MatTableModule, MatTabsModule, MatIconModule, MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [MatTableModule, MatTabsModule, MatIconModule, MatSortModule, MatPaginatorModule],
  exports: [MatTableModule, MatTabsModule, MatIconModule, MatSortModule, MatPaginatorModule]
})

export class AppMaterialModule {
}
