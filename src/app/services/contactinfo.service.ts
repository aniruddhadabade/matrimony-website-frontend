import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfo } from '../models/contactInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactinfoService {

  private baseUrl = 'http://localhost:8080/api/contact';

  constructor(private httpClient: HttpClient) {}

  createContact(contact: ContactInfo): Observable<ContactInfo> {
    return this.httpClient.post<ContactInfo>(this.baseUrl, contact);
  }

  getAllContacts(): Observable<ContactInfo[]> {
    return this.httpClient.get<ContactInfo[]>(this.baseUrl);
  }

  getContactById(id: number): Observable<ContactInfo> {
    return this.httpClient.get<ContactInfo>(`${this.baseUrl}/${id}`);
  }

  updateContact(id: number, contact: ContactInfo): Observable<ContactInfo> {
    return this.httpClient.put<ContactInfo>(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
