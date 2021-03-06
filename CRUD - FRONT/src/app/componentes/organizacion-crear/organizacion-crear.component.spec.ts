import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionCrearComponent } from './organizacion-crear.component';

describe('OrganizacionCrearComponent', () => {
  let component: OrganizacionCrearComponent;
  let fixture: ComponentFixture<OrganizacionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
