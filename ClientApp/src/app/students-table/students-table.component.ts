import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../services/students.service';
import { Student } from '../interfaces/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'app/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'age', 'career', 'actions'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public students: Student[] = [];

  constructor(
    private _studentsService: StudentsService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService) {
    this.getStudents();
  }

  //Get Students from API
  getStudents(): void {
    this._studentsService.getStudents().subscribe(result => {
      // this.students = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  //Function for filter students in table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addStudent() {
    // Open dialog
    const addDialog = this._matDialog.open(ModalComponent, {data: {title: 'Add student'}, width: '550px'});

    addDialog.beforeClosed().subscribe(res => {
      if(res.result) {
        // Create Student if result is true
        this._studentsService.saveStudent(res.data).subscribe(r => {
          // Show toastr and refresh data
          this.getStudents();
          this._toastr.success('Success', 'Student created successfully');

        }, error => {
          // Show error
          this._toastr.error('Error', 'Something was wrong, try again');
        });

      }
    });
  }

  editStudent(student: Student) {
    // Open dialog
    const addDialog = this._matDialog.open(ModalComponent, {data: {title: 'Edit student', student}, width: '550px'});

    addDialog.beforeClosed().subscribe(res => {
      if(res.result) {
        // Create Student if result is true
        this._studentsService.editStudent(res.data).subscribe(r => {
          // Show toastr and refresh data
          this.getStudents();
          this._toastr.success('Success', 'Student updated successfully');

        }, error => {
          // Show error
          this._toastr.error('Error', 'Something was wrong, try again');
        });

      }
    });
  }

  deleteStudent(student: Student) {
    // Open dialog
    const addDialog = this._matDialog.open(ConfirmDialogComponent, {data: {student}, width: '550px'});

    addDialog.beforeClosed().subscribe(res => {
      if(res.result) {
        // Create Student if result is true
        this._studentsService.deleteStudent(student.id).subscribe(r => {
          // Show toastr and refresh data
          this.getStudents();
          this._toastr.success('Success', 'Student deleted successfully');

        }, error => {
          // Show error
          this._toastr.error('Error', 'Something was wrong, try again');
        });

      }
    });
  }
}

