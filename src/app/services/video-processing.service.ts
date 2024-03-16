import { Injectable } from '@angular/core';
import { UploadModel } from '../models/upload.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { VideoProcessModel } from '../models/video-process.model';

@Injectable({
  providedIn: 'root'
})
export class VideoProcessingService {

  constructor(private httpClient: HttpClient) { }

  public send(upload: UploadModel): Observable<any> {
    const formData = new FormData();

    if(!upload.video) return EMPTY;

    formData.append('FormFile', upload.video, upload.video?.name);

    //return this.httpClient.post(``, formData);

    return of('OK');
  }

  public getAll(): Observable<VideoProcessModel[]> {
    //return this.httpClient.get<VideoProcessModel[]>(``);

    // ...:: Mock ::...
    const ELEMENT_DATA: VideoProcessModel[] = [
      {
        id: 'WERTYUIASD',
        inputName: 'Vídeo ex.mp4',
        outputName: 'Video.zip',
        status: 'processamento',
      },
    ];

    return of(ELEMENT_DATA);
  }
}
