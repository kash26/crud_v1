import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  postEmployee(data: any) {
    return this._http.post<any>(`${this.url}/posts`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployee() {
    return this._http.get<any>(`${this.url}/posts`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateEmployee(data: any, id: number) {
    return this._http.put<any>(`${this.url}/posts/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmployee(id: number) {
    return this._http.delete<any>(`${this.url}/posts/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
