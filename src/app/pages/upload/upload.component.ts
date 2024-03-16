import { Component } from '@angular/core';
import { DropAreaComponent } from '../../components/drop-area/drop-area.component';
import {MatButtonModule} from '@angular/material/button';
import { UploadService } from '../../services/video-processing.service';
import { UploadModel } from '../../models/upload.model';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [DropAreaComponent, MatButtonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  constructor(private uploadService: UploadService){}

  msgDropArea: string | undefined = 'Arraste e solte o vídeo aqui ou clique para selecionar';
  fileSelected: File | undefined;
  hasFileSelected: boolean = false;


  onFilesDropped(event: any) {
    if (event[0]) {
      this.hasFileSelected = true;
      this.fileSelected = event[0];
    } else {
      this.hasFileSelected = false;
    }
  }

  onSend() {
    if(!this.hasFileSelected) {
      return;
    }

    const upload: UploadModel = {
      video: this.fileSelected
    }

    this.uploadService.send(upload);
  }

}
