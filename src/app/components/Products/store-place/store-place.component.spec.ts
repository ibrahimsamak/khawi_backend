import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePlaceComponent } from './store-place.component';

describe('StorePlaceComponent', () => {
  let component: StorePlaceComponent;
  let fixture: ComponentFixture<StorePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
