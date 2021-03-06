import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/Servicios/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {

  Item = {
    NombreCompleto: '',
    Cedula: '',
    FechaNacimiento: '',
    Telefono: '',
    OrganizacionID: ''
  };// Almacena los datos a almacenar
  Organizaciones = null; // Almacena los datos del elemento seleccionado

  constructor(private ApiService: ApiService, private ira: Router) { }
  // ------------------ Iniciar ------------------ //
  ngOnInit(): void {
    this.ListarOrganizaciones();
  }

  // ------------------ Registrar item ------------------ //
  Registrar(): void {
    const data = {
      NombreCompleto: this.Item.NombreCompleto,
      Cedula: this.Item.Cedula,
      FechaNacimiento: this.Item.FechaNacimiento,
      Telefono: this.Item.Telefono,
      OrganizacionID: this.Item.OrganizacionID,
    };
    var hoy = moment(new Date());

    if (moment(new Date(data.FechaNacimiento)) > hoy) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'La fecha de nacimiento no puede mayor a la fecha actual.'
      })
      return;
    } 


    // Campos obligatorios
    if (data.NombreCompleto == "" || data.Cedula == "" || data.FechaNacimiento == "" || data.Telefono == "" || data.OrganizacionID == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'Debe llenar todos los campos obligatorios.'
      })
      return;
    }
    // Nombre completo - solo texto
    if (!this.solotexto(data.NombreCompleto.toString())) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'El nombre no puede contener números'
      })
      return;
    }
    // Nombre completo - Longitud
    if (!this.ValidarLongitud(data.NombreCompleto.toString(), 50)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'El nombre ingresado es muy largo'
      })
      return;
    }
    // cedula - formato cedula 
    if (!this.CedulaVenezolana(data.Cedula.toString())) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'La cédula no cumple con el formato solicitado.'
      })
      return;
    }

    // Telefono - Longitud
    if (!this.ValidarLongitud(data.Telefono.toString(), 10)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'El teléfono ingresado es muy largo'
      })
      return;
    }
    // Teléfono - solo numeros
    if (!this.solonumeros(data.Telefono.toString())) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Imposible continuar',
        footer: 'El teléfono debe ser númerico'
      })
      return;
    }

    this.ApiService.InsertarUsuario(data)
      .subscribe(
        response => {
          if (response != "Duplicado") {
            Swal.fire({
              icon: 'success',
              title: 'Hurra...',
              text: 'Registro almacenado con éxito',
              footer: 'La organización se ha almacenado con exitosamente.'
            });
            this.ira.navigate(['Usuarios']);
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

  // ------------------ Listar Organizaciones------------------ //
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
