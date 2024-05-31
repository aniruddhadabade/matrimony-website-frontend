import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  rid: number = 0;

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) { }

  createUserInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(this.baseUrl, userInfo);
  }

  getUserInfoById(id: number): Observable<UserInfo> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<UserInfo>(url);
  }

  updateUserInfo(id: number, userInfo: UserInfo): Observable<UserInfo> {
    return this.httpClient.put<UserInfo>(`${this.baseUrl}/${id}`, userInfo);
  }

  // Method to delete user info
  deleteUserInfo(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getAllUser(): Observable<UserInfo[]> {
    return this.httpClient.get<UserInfo[]>(this.baseUrl);
  }

    // admin

    getAdmin(): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl);
    }
  
    registerUser(user: any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl, user);
    }
  
    updateUser(userInfo: UserInfo): Observable<any> {
      return this.httpClient.put(`${this.baseUrl}/${userInfo.userId}`, userInfo);
    }

    deleteUser(userId: number): Observable<any> {
      // Ensure the correct endpoint and method are used for deletion
      return this.httpClient.delete(`${this.baseUrl}/${userId}`);
    }

}

