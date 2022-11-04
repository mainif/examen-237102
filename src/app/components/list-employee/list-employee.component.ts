import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EspacioService } from 'src/app/services/espacio.service';
import { Espacio } from '../../models/espacio';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Espacio>();

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private espacioService: EspacioService,
    private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployees() {
    this.espacioService.getEmployees().subscribe((data: Espacio[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
  }


  deleteEmployee(id:number){
    this.espacioService.deleteEmployee(id).subscribe(()=>{
      this.dataSource.data=this.dataSource.data.filter((e:Espacio)=>{
        this.snackBar.open("Empleado eliminado",'',{
          duration:3000,
        })
        return e.id!=id?e:false
      })
    })
  }
}
