import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ApiService } from "./Servicios/api.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { OrganizacionCrearComponent } from './componentes/organizacion-crear/organizacion-crear.component';
import { OrganizacionDetallarComponent } from './componentes/organizacion-detallar/organizacion-detallar.component';
import { OrganizacionListarComponent } from './componentes/organizacion-listar/organizacion-listar.component';
import { OrganizacionEditarComponent } from './componentes/organizacion-editar/organizacion-editar.component';
import { UsuariosCrearComponent } from './componentes/usuarios-crear/usuarios-crear.component';
import { UsuariosEditarComponent } from './componentes/usuarios-editar/usuarios-editar.component';
import { UsuariosListarComponent } from './componentes/usuarios-listar/usuarios-listar.component';
import { UsuariosDetallarComponent } from './componentes/usuarios-detallar/usuarios-detallar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    OrganizacionCrearComponent,
    OrganizacionDetallarComponent,
    OrganizacionListarComponent,
    OrganizacionEditarComponent,
    UsuariosCrearComponent,
    UsuariosEditarComponent,
    UsuariosListarComponent,
    UsuariosDetallarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule, 
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule
  ],
  providers: [HttpClient, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
