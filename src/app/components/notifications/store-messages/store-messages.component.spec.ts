import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMessagesComponent } from './store-messages.component';

describe('StoreMessagesComponent', () => {
  let component: StoreMessagesComponent;
  let fixture: ComponentFixture<StoreMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
