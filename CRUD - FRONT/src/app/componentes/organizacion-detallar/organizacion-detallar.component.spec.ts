import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionDetallarComponent } from './organizacion-detallar.component';

describe('OrganizacionDetallarComponent', () => {
  let component: OrganizacionDetallarComponent;
  let fixture: ComponentFixture<OrganizacionDetallarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionDetallarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionDetallarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
