import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewComponent } from './view/view.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular8-CrudApplication';

  displayedColumns: string[] = ['name', 'gender', 'email','phoneNumber','startDate','role','department','employment','salary','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllEployee();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllEployee();
      }
    })
  }
  getAllEployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.sort;
      },
      error:()=>{
        alert("error while fetching data");
      }
    })
  }
  viewEmployee(row:any){
    this.dialog.open(ViewComponent, 
     {
      width:'30%',
      data:row
     } )
  }
  editEmployee(row:any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEployee();
      }
    })
  }
  deleteEmployee(id:number){
this.api.deleteEmployee(id).
subscribe({
  next:(res)=>{
    alert("delete data succussfully");
    this.getAllEployee();
  },
  error:()=>{
    alert("error while delete data")
  }
})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

