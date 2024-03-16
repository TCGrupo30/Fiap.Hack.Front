import { Injectable } from '@angular/core';
import { UploadModel } from '../models/upload.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoProcessingService {

  constructor(private httpClient: HttpClient) { }

  public send(upload: UploadModel) {
    const formData = new FormData();

    if(!upload.video) return;

    formData.append('FormFile', upload.video, upload.video?.name);

    return this.httpClient.post(``, formData);
  }
}
