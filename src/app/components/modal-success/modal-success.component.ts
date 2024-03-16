import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss',
})
export class ModalSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
