import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup =  new FormGroup({});
  //Inject data from parent
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder, private _matDialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    // Fill the form if data has student, else create empty form
    if(this.data.student) {
      this.form = this._fb.group({
        id:        [this.data.student.id],
        username:  [this.data.student.username, [Validators.required]],
        firstName: [this.data.student.firstName, [Validators.required]],
        lastName:  [this.data.student.lastName, [Validators.required]],
        age:       [this.data.student.age, [Validators.required]],
        career:    [this.data.student.career, [Validators.required]],
      });
    } else {
      this.form = this._fb.group({
        id:        [0],
        username:  ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName:  ['', [Validators.required]],
        age:       [null, [Validators.required]],
        career:    ['', [Validators.required]],
      });
    }

  }

  saveForm() {
    //Mark all inputs for validate
    this.form.markAllAsTouched();
    if(this.form.valid) {
      // If valid close dialog and return true
      this._matDialogRef.close({result : true, data: this.form.value});
    }
  }

  close() {
    // Close the dialog
    this._matDialogRef.close({result: false});
  }

}
