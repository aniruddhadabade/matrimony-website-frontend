import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EducationInfo } from '../models/educationInfo';

@Injectable({
  providedIn: 'root'
})
export class EducationInfoService {

  private baseUrl = 'http://localhost:8080/api/edu';

  constructor(private httpClient: HttpClient) { }

  createEduInfo(eduInfo: EducationInfo): Observable<EducationInfo> {
    return this.httpClient.post<EducationInfo>(this.baseUrl, eduInfo);
  }

  getAllEducation(): Observable<EducationInfo[]> {
    return this.httpClient.get<EducationInfo[]>(this.baseUrl);
  }

  updateEducationInfo(id: number, eduInfo: any): Observable<any> {
    return this.httpClient.put<EducationInfo>(`${this.baseUrl}/${id}`, eduInfo);
  }

  deleteEducationInfo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
  



}
