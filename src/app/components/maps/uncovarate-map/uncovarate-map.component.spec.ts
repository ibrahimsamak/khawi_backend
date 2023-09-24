import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncovarateMapComponent } from './uncovarate-map.component';

describe('UncovarateMapComponent', () => {
  let component: UncovarateMapComponent;
  let fixture: ComponentFixture<UncovarateMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncovarateMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncovarateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
