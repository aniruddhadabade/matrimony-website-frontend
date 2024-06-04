import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  rid: number | undefined;

  private baseUrl = 'http://localhost:8080/api/message'; 

  constructor(private httpClient: HttpClient) {}

  addMessage(message: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, message);
  }

  getMessages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }
  
  deleteMessage(msgId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${msgId}`);
  }
}
