import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { espacio } from '../models/espacio';

@Injectable({
  providedIn: 'root',
})
export class EspacioService {
  basePath: string = environment.basePath;

  constructor(private http: HttpClient) {}

  getEspacio() {
    return this.http.get<espacio[]>(this.basePath);
  }

  addEspacio(espacio: espacio){
    return this.http.post<espacio>(this.basePath,espacio);
  }

  updateEspacio(id:any,espacio: espacio){
    return this.http.put<espacio>(`${this.basePath}/${id}`, espacio);
  }


  deleteEspacio(id:any){
    return this.http.delete<espacio>(`${this.basePath}/${id}`)
  }
}
