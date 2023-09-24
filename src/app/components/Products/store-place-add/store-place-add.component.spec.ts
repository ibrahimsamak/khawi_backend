import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePlaceAddComponent } from './store-place-add.component';

describe('StorePlaceAddComponent', () => {
  let component: StorePlaceAddComponent;
  let fixture: ComponentFixture<StorePlaceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePlaceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePlaceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
