import { Component, OnInit, ViewChild, Directive } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
@Directive({
  selector: '[appDataTable]'
})
export class MyDataTableDirective {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  ss: string = 'mostafaaaaaaaaaaaa';
  constructor() { }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }

  }

}
