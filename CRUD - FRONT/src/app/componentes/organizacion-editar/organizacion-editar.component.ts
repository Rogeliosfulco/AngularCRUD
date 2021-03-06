import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion-editar',
  templateUrl: './organizacion-editar.component.html',
  styleUrls: ['./organizacion-editar.component.css']
})
export class OrganizacionEditarComponent implements OnInit {
  Item = null;

  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  // ------------------ Iniciar ------------------ //
  ngOnInit(): void {
    this.ObtenerDetalle(this.route.snapshot.paramMap.get('id'));
  }

  // ------------------ Editar datos de una organizacion ------------------ //
  Actualizar(): void {
    try {

      if (this.Item.Nombre == "" || this.Item.Nombre == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'Debe llenar todos los campos obligatorios.'
        })
        return;
      }

      if (this.Item.Nombre.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'El registro debe tener al menos 3 caracteres.'
        })
        return;
      }
      this.ApiService.EditarOrganizacion(this.Item.OrganizacionID, this.Item)
        .subscribe(
          response => {
            if (response != "Duplicado") {
              Swal.fire({
                icon: 'success',
                title: 'Hurra...',
                text: 'Registro actualizado con éxito',
                footer: 'La organización se ha actualizado con exitosamente.'
              });
              this.router.navigate(['organizaciones']);
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Hey...',
                text: 'Registro existente',
                footer: 'La organización que esta intentando ingresar ya existe.'
              });
            }
          },
          error => {
            console.log(error);
          });

    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Hey...',
        text: 'Ocurrió un error: ',
        footer: error,
      });
    }
  }

  // ------------------ Obtener detalle del registro ------------------ //
  ObtenerDetalle(id): void {
    try {
      this.ApiService.DetallarOrganizacion(id)
        .subscribe(
          Obj => {
            this.Item = Obj;
          },
          error => {
            console.log(error);
          });

    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Hey...',
        text: 'Ocurrió un error: ',
        footer: error,
      });
    }
  }
}
