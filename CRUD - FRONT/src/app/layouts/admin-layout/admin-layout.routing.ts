import { Routes } from '@angular/router';
import { DashboardComponent } from '../../componentes/dashboard/dashboard.component';
import { OrganizacionListarComponent } from 'app/componentes/organizacion-listar/organizacion-listar.component';
import { OrganizacionDetallarComponent } from 'app/componentes/organizacion-detallar/organizacion-detallar.component';
import { OrganizacionCrearComponent } from 'app/componentes/organizacion-crear/organizacion-crear.component';
import { OrganizacionEditarComponent } from 'app/componentes/organizacion-editar/organizacion-editar.component';
import { UsuariosEditarComponent } from 'app/componentes/usuarios-editar/usuarios-editar.component';
import { UsuariosListarComponent } from 'app/componentes/usuarios-listar/usuarios-listar.component';
import { UsuariosCrearComponent } from 'app/componentes/usuarios-crear/usuarios-crear.component';
import { UsuariosDetallarComponent } from 'app/componentes/usuarios-detallar/usuarios-detallar.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'organizaciones', component: OrganizacionListarComponent },
    { path: 'organizaciones/:id', component: OrganizacionDetallarComponent },
    { path: 'Organizacioncrear', component: OrganizacionCrearComponent },
    { path: 'OrganizacionEditar/:id', component: OrganizacionEditarComponent },
    { path: 'Usuarios', component: UsuariosListarComponent },
    { path: 'UsuariosCrear', component: UsuariosCrearComponent },
    { path: 'UsuariosEditar/:id', component: UsuariosEditarComponent },
    { path: 'Usuario/:id', component: UsuariosDetallarComponent }
];
