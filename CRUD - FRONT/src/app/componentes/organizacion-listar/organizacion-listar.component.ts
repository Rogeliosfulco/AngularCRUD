import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion-listar',
  templateUrl: './organizacion-listar.component.html',
  styleUrls: ['./organizacion-listar.component.css']
})
export class OrganizacionListarComponent implements OnInit {
  Registros: any;

  constructor(private ApiService: ApiService) { }

  // ------------------ Iniciar ------------------ //
  ngOnInit(): void {
    this.ListarRegistros();
  }
  // ------------------ Listar Registros ------------------ //
  ListarRegistros(): void {
    this.ApiService.ListarOrganizaciones()
      .subscribe(
        Obj => {
          this.Registros = Obj;
          console.log(Obj);
        },
        error => {
          console.log(error);
        });
  }
  // ------------------ Eliminar un Organizacion ------------------ //
  EliminarRegistro(id): void {
    Swal.fire({
      icon: 'warning',
      title: '¡Hey!',
      text: 'Eliminar registro',
      footer: '¿Está seguro de eliminar este registro?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApiService.EliminarOrganizacion(id)
          .subscribe(
            response => {
              // alert(response)
              if (response.includes("Exito")) {
                Swal.fire('Registro eliminado con éxito!', '', 'success')
                Swal.fire({
                  icon: 'success',
                  title: 'Hurra...',
                  text: 'Registro eliminado',
                  footer: 'Se ha eliminado el registro exitosamente.'
                })
                
              }
              else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Oops...',
                  text: 'Imposible eliminar',
                  footer: 'Ups! Ocurrió al eliminar el registro, asegurese que la organización no contenga usuarios.'
                })
                
              }
             this.ListarRegistros();
            },
            error => {
              console.log(error);
            });
      }
    })
  }
}
