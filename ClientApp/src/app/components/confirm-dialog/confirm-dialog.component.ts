import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _matDialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
  }

  delete() {
    this._matDialogRef.close({result: true});
  }

  close() {
    this._matDialogRef.close({result: false});
  }

}
