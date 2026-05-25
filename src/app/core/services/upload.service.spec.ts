import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { UploadResponse } from '../models/upload.model';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/upload`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('uploadFile() envoie POST /upload avec un FormData contenant le champ "file"', () => {
    const file = new File(['data'], 'cover.png', { type: 'image/png' });
    const mockResp: UploadResponse = {
      message: 'Fichier uploadé avec succès',
      filename: '123-cover.png',
      url: 'http://localhost:3000/uploads/123-cover.png',
      mimeType: 'image/png',
    };

    service.uploadFile(file).subscribe((r: UploadResponse) => expect(r).toEqual(mockResp));

    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBe(true);
    expect(req.request.body.get('file')).toBe(file);
    req.flush(mockResp);
  });
});
