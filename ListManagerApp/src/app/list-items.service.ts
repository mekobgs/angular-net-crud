import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListItemsService {
  private apiUrl = 'https://localhost:5001/api/listitems';

  constructor(private http: HttpClient) { }

  getListItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addListItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateListItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteListItem(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}