import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoProcessModel } from '../../models/video-process.model';
import { VideoProcessingService } from '../../services/video-processing.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'inputName', 'outputName', 'status', 'actions'];
  dataSource = new MatTableDataSource<VideoProcessModel>();


  constructor(private videoProcessingService: VideoProcessingService, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.videoProcessingService.getAll()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error: () => {
        this.snackBar.open('Houve um problema de comunicação', 'OK');
      }
    })
  }
}
