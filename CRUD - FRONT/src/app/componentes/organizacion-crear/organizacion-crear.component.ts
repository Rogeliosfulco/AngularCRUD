import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'organizacion-crear',
  templateUrl: './organizacion-crear.component.html',
  styleUrls: ['./organizacion-crear.component.css']
})
export class OrganizacionCrearComponent implements OnInit {

  Item = {
    Nombre: ''
  };

  constructor(private ApiService: ApiService, private ira: Router) { }
  // ------------------ Iniciar ------------------ //
  ngOnInit(): void {
  }
  // ------------------ Registrar item ------------------ //
  Registrar(): void {
    const data = {
      Nombre: this.Item.Nombre
    };
    // Validar campos vacios
    if (data.Nombre == "" || data.Nombre == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'Debe llenar todos los campos obligatorios.'
      })
      return;
    }
    // Validar longitud de nombre
    if (data.Nombre.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'El registro debe tener al menos 3 caracteres.'
      })
      return;
    }
    // Realizar Llamado
    this.ApiService.InsertarOrganizacion(data)
      .subscribe(
        response => {
          if (response != "Duplicado") {
            Swal.fire({
              icon: 'success',
              title: 'Hurra...',
              text: 'Registro almacenado con éxito',
              footer: 'La organización se ha almacenado con exitosamente.'
            });
            this.ira.navigate(['organizaciones']);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Hey...',
              text: 'Ese regisro ya existe',
              footer: 'La organización que esta intentando ingresar ya existe.'
            });
          }
        },
        error => {
          console.log(error);
        });
  }
 

}