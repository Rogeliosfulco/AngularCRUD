import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {

  Item = null; // Almacena los datos del elemento seleccionado
  Organizaciones = null; // Almacena los datos del elemento seleccionado

  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  // ------------------ Iniciar ------------------ //
  ngOnInit(): void {
    this.ObtenerDetalle(this.route.snapshot.paramMap.get('id'));
    this.ListarOrganizaciones();
  }

  // ------------------ Editar datos de un usuario ------------------ //
  Actualizar(): void {
    try {


      var d1 = Date.parse(this.Item.FechaNacimiento);

      // Campos obligatorios
      if (this.Item.NombreCompleto == "" || this.Item.Cedula == "" || this.Item.FechaNacimiento == "" || this.Item.Telefono == "" || this.Item.OrganizacionID == "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'Debe llenar todos los campos obligatorios.'
        })
        return;
      }
      // Nombre completo - solo texto
      if (!this.solotexto(this.Item.NombreCompleto.toString())) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'El nombre no puede contener números'
        })
        return;
      }
      // Nombre completo - Longitud
      if (!this.ValidarLongitud(this.Item.NombreCompleto.toString(), 50)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'El nombre ingresado es muy largo'
        })
        return;
      }
      // cedula - formato cedula 
      if (!this.CedulaVenezolana(this.Item.Cedula.toString())) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'La cédula no cumple con el formato solicitado.'
        })
        return;
      }

      // Telefono - Longitud
      if (!this.ValidarLongitud(this.Item.Telefono.toString(), 11)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'El teléfono ingresado es muy largo'
        })
        return;
      }
      // Teléfono - solo numeros
      if (!this.solonumeros(this.Item.Telefono.toString())) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Imposible continuar',
          footer: 'El teléfono debe ser númerico'
        })
        return;
      }

      this.ApiService.EditarUsuario(this.Item.UsuarioID, this.Item)
        .subscribe(
          response => {
            if (response != "Duplicado") {
              Swal.fire({
                icon: 'success',
                title: 'Hurra...',
                text: 'Registro actualizado con éxito',
                footer: 'La organización se ha actualizado con exitosamente.'
              });
              this.router.navigate(['Usuarios']);
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

      this.ApiService.DetallarUsuario(id)
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

  ListarOrganizaciones(): void {
    this.ApiService.ListarOrganizaciones()
      .subscribe(
        Obj => {
          this.Organizaciones = Obj;
          console.log(Obj);
        },
        error => {
          console.log(error);
        });
  }

  // ------------------ Validaciones ------------------ //
  ValidarLongitud(params, LongitdMaxima) {
    if (params !== "") {
      if (params.length > LongitdMaxima) {
        return false;
      }
      else {
        return true;
      }
    } else {
      return false;
    }
  }
  solotexto(inputtxt) {
    // console.log(inputtxt)
    if (inputtxt != null || inputtxt != "") {
      var letters = /^[A-Za-z ]+$/;
      if (inputtxt.match(letters)) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  solonumeros(inputtxt) {
    try {
      var numbers = /^[0-9]+$/;
      if (inputtxt.match(numbers)) {
        return true;
      }
      else {
        return false;
      }
    } catch (ex) {
      // console.log('error', ex)
      return false;
    }
  }
  CedulaVenezolana(inputtxt) {
    try {
      var Cedula = /^[V|E|J|P][0-9]{5,9}$/;
      if (inputtxt.match(Cedula)) {
        return true;
      }
      else {
        return false;
      }
    } catch (ex) {
      // console.log('error', ex)
      return false;
    }
  }

}
