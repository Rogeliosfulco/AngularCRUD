import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseURL = 'http://localhost:1887';  // URL de la API 

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  constructor(private http: HttpClient) { }

  // -----------------------------------------------------------------------------------------------//
  // ------------------------------------------- USUARIOS ------------------------------------------//
  // -----------------------------------------------------------------------------------------------//
  ListarUsuarios(): Observable<any> {
    return this.http.get(`${baseURL}/ListarUsuarios`);
  }
  // Detallar los Usuarios
  DetallarUsuario(id): Observable<any> {
    return this.http.get(`${baseURL}/DetallarUsuario/${id}`);
  }
  // Insertar los Usuarios
  InsertarUsuario(data): Observable<any> {
    return this.http.post(`${baseURL}/InsertarUsuario`, data);
  }
  // Editar los Usuarios
  EditarUsuario(id, data): Observable<any> {
    return this.http.put(`${baseURL}/EditarUsuario/${id}`, data);
  }
  // Eliminar los Usuarios
  EliminarUsuario(id): Observable<any> {
    return this.http.delete(`${baseURL}/EliminarUsuario/${id}`);
  }
  // -----------------------------------------------------------------------------------------------//
  // ------------------------------------------- ORGANIZACIONES ------------------------------------//
  // -----------------------------------------------------------------------------------------------//
  // Obtener todos las Organizaciones
  ListarOrganizaciones(): Observable<any> {
    return this.http.get(`${baseURL}/ListarOrganizaciones`);
  }
  // Detallar las Organizaciones
  DetallarOrganizacion(id): Observable<any> {
    return this.http.get(`${baseURL}/DetallarOrganizacion/${id}`);
  }
  // Insertar las Organizaciones
  InsertarOrganizacion(data): Observable<any> {
    return this.http.post(`${baseURL}/InsertarOrganizacion`, data);
  }
  // Editar las Organizaciones
  EditarOrganizacion(id, data): Observable<any> {
    return this.http.put(`${baseURL}/EditarOrganizacion/${id}`, data);
  }
  // Eliminar las Organizaciones
  EliminarOrganizacion(id): Observable<any> {
    return this.http.delete(`${baseURL}/EliminarOrganizacion/${id}`);
  }





}
