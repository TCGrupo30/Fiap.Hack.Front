import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface VideoProcessModel {
  id: string;
  inputName: string;
  outputName: string;
  status: string;
}

const ELEMENT_DATA: VideoProcessModel[] = [
  {
    id: 'WERTYUIASD',
    inputName: 'Vídeo ex.mp4',
    outputName: 'Video.zip',
    status: 'processamento',
  },
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  displayedColumns: string[] = ['id', 'inputName', 'outputName', 'status', 'actions'];
  dataSource = ELEMENT_DATA;
}
