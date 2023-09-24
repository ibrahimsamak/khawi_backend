import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesProductAddComponent } from './places-product-add.component';

describe('PlacesProductAddComponent', () => {
  let component: PlacesProductAddComponent;
  let fixture: ComponentFixture<PlacesProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
