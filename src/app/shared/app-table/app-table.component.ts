import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {defaultUsersListTableColumns} from '../../features/users-table/services/users-list.default';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.sass']
})
export class AppTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() userData: [];
  @Output() deleteUserClick: EventEmitter<any> = new EventEmitter();
  @Output() detailsClick: EventEmitter<any> = new EventEmitter();
  columnsAttr: string[];
  dataSource: any;
  tableColumns = defaultUsersListTableColumns;
  constructor() { }

  ngOnInit() {
    this.columnsAttr = this.tableColumns.map(column => column.attr);
  }

  ngAfterViewInit() {
    this.sort.disableClear = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.userData.currentValue);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onActionClick(action, row) {
    if (action === 'onDeleteUserClick') {
      this.deleteUserClick.emit(row);
    }
  }

  onRowClick(row) {
    this.detailsClick.emit(row);
  }
}
