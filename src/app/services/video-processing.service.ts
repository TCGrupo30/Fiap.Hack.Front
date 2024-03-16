import { Injectable } from '@angular/core';
import { UploadModel } from '../models/upload.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { VideoProcessModel } from '../models/video-process.model';

@Injectable({
  providedIn: 'root'
})
export class VideoProcessingService {

  url = 'https://localhost:7174/Video'

  constructor(private httpClient: HttpClient) { }

  public send(upload: UploadModel): Observable<any> {
    const formData = new FormData();

    if(!upload.fileVideo) return EMPTY;

    formData.append('FileVideo', upload.fileVideo, upload.fileVideo?.name);

    return this.httpClient.post(this.url, formData);
  }

  public getAll(): Observable<VideoProcessModel[]> {
    return this.httpClient.get<VideoProcessModel[]>(`${this.url}/GetAllVideos`);
  }
}
