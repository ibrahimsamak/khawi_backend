import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderDetailsPoPComponent } from "./order-details.component";

describe("OrderDetailsPoPComponent", () => {
  let component: OrderDetailsPoPComponent;
  let fixture: ComponentFixture<OrderDetailsPoPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsPoPComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsPoPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
