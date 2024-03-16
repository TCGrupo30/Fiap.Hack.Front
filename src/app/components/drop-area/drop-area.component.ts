import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drop-area',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './drop-area.component.html',
  styleUrl: './drop-area.component.scss',
})
export class DropAreaComponent {

  @ViewChild('fileInput', { read: ViewContainerRef })
  fileInput?: ViewContainerRef

  @Output() filesDropped: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Input('text') text =
    'Arraste e solte arquivos aqui ou clique para selecionar';
  @Input('extensions') extensions: string = '*.*';
  @Input() isLoading = false;

  files: File[] = [];

  constructor() {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.highlightDropArea(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.highlightDropArea(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.highlightDropArea(false);

    const files = event.dataTransfer?.files;
    if (!files) return;
    this.handleFiles(files);
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.handleFiles(files);
  }

  clean(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [];

    const fileInput = this.fileInput?.element.nativeElement;

    if (this.fileInput?.element.nativeElement?.value) {
      fileInput.value = '';
    }

    this.filesDropped.emit(this.files);
  }

  private handleFiles(files: FileList): void {
    if(this.isLoading) return;

    this.files = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.files.push(file);
    }

    this.filesDropped.emit(this.files);
  }

  private highlightDropArea(highlight: boolean): void {
    const dropArea = document.getElementById('drop-area');
    if (highlight) {
      dropArea?.classList.add('drag-over');
    } else {
      dropArea?.classList.remove('drag-over');
    }
  }
}
