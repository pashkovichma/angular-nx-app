import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as { name: string };
}
