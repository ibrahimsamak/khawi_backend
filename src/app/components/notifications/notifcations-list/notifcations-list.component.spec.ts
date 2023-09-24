import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationsListComponent } from './notifcations-list.component';

describe('NotifcationsListComponent', () => {
  let component: NotifcationsListComponent;
  let fixture: ComponentFixture<NotifcationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifcationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifcationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
