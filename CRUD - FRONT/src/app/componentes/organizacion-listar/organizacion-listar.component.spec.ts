import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionListarComponent } from './organizacion-listar.component';

describe('OrganizacionListarComponent', () => {
  let component: OrganizacionListarComponent;
  let fixture: ComponentFixture<OrganizacionListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
