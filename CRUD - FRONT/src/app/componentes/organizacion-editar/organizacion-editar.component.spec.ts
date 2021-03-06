import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionEditarComponent } from './organizacion-editar.component';

describe('OrganizacionEditarComponent', () => {
  let component: OrganizacionEditarComponent;
  let fixture: ComponentFixture<OrganizacionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
