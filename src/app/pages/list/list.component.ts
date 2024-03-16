import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoProcessModel } from '../../models/video-process.model';
import { VideoProcessingService } from '../../services/video-processing.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'inputName', 'outputName', 'status', 'actions'];
  dataSource = new MatTableDataSource<VideoProcessModel>();

  private subscription: Subscription;
  recoveryTime = 30000;

  constructor(private videoProcessingService: VideoProcessingService, private snackBar: MatSnackBar){

    this.subscription = interval(this.recoveryTime).subscribe(() => {
      this.load();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.videoProcessingService.getAll()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error: () => {
        this.snackBar.open('Houve um problema de comunicação', 'OK');
      }
    });
  }
}
