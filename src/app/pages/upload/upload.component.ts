import { Component } from '@angular/core';
import { DropAreaComponent } from '../../components/drop-area/drop-area.component';
import { MatButtonModule } from '@angular/material/button';
import { VideoProcessingService } from '../../services/video-processing.service';
import { UploadModel } from '../../models/upload.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalSuccessComponent } from '../../components/modal-success/modal-success.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, DropAreaComponent, MatButtonModule, MatSnackBarModule, ModalSuccessComponent, MatProgressBarModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  constructor(
    private videoProcessingService: VideoProcessingService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  msgDropArea: string | undefined =
    'Arraste e solte o vídeo aqui ou clique para selecionar';
  fileSelected: File | undefined;
  hasFileSelected: boolean = false;
  isLoading = false;

  onFilesDropped(event: any) {
    if (event[0]) {
      this.hasFileSelected = true;
      this.fileSelected = event[0];
    } else {
      this.hasFileSelected = false;
    }
  }

  onSend(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isLoading = true;

    if(!this.fileSelected) {
      this.fileSelected = undefined;
      this.hasFileSelected = false;
      this.isLoading = false;
      this.snackBar.open('Por favor, selecione um arquivo de vídeo para prosseguir.', 'OK');
    }

    const upload: UploadModel = {
      fileVideo: this.fileSelected,
    };

    this.videoProcessingService.send(upload).subscribe({
      next: () => {
        const dialog = this.dialog.open(ModalSuccessComponent, {});

        dialog.afterClosed().subscribe(() => {
          this.router.navigate(['list']);
        })
      },
      error: () => {
        this.snackBar.open('Houve um problema de comunicação', 'OK');
      },
    }).add(() => {
      this.isLoading = false;
    });
  }
}
