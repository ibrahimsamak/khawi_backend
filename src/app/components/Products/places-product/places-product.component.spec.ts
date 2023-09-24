import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesProductComponent } from './places-product.component';

describe('PlacesProductComponent', () => {
  let component: PlacesProductComponent;
  let fixture: ComponentFixture<PlacesProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
