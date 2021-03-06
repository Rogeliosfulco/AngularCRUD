import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/Servicios/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion-detallar',
  templateUrl: './organizacion-detallar.component.html',
  styleUrls: ['./organizacion-detallar.component.css']
})
export class OrganizacionDetallarComponent implements OnInit {
  OrganizacionSeleccionada = null;

  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.ObtenerDetalle(this.route.snapshot.paramMap.get('id'));
  }


  // ------------------ Obener ID del regisro ------------------ //
  ObtenerDetalle(id): void {
    try {
      this.ApiService.DetallarOrganizacion(id)
        .subscribe(
          product => {
            this.OrganizacionSeleccionada = product;
            console.log(product);
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
