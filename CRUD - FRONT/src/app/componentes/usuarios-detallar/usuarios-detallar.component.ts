import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-detallar',
  templateUrl: './usuarios-detallar.component.html',
  styleUrls: ['./usuarios-detallar.component.css']
})
export class UsuariosDetallarComponent implements OnInit {
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }
  Item = null;
  Organizaciones = null; // Almacena los datos del elemento seleccionado

  ngOnInit(): void {
    this.ObtenerDetalle(this.route.snapshot.paramMap.get('id'));
    this.ListarOrganizaciones();
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



  // ------------------ Obener ID del regisro ------------------ //
  ObtenerDetalle(id): void {
    try {
      this.ApiService.DetallarUsuario(id)
        .subscribe(
          Item => {
            this.Item = Item;
            console.log(Item);
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
